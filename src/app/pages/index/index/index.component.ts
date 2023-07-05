import { Component, Inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router'

import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'
import { NzMessageService } from 'ng-zorro-antd/message'

import { UserInfoStore } from '@/app/stores/userInfo'

import { AuthenticateService } from '@/app/pages/authenticate/services'
import { tokenLocalforage } from '@/app/storage/localforage'

import { environment } from '@/environments/environment'

import { MenuStore } from '@/app/stores/menu'
import type { MenuDataItemType } from '@/app/pages/personal-center/types'

import { GET_ACTIVE_ROUTE, GET_ACTIVE_ROUTE_TYPE } from '@/app/shared/utils/getActiveRoute'
import { ColorPickerComponent, ColorType } from '@/app/shared/color-picker/color-picker.component'
import { slideInAnimation } from './animations'
import { filter } from 'rxjs'

import { NzConfigService } from 'ng-zorro-antd/core/config'

interface Menu {
  title: string
  path?: string
  icon?: string
  level: number
  children?: Menu[]
}

@Component({
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzAvatarModule,
    NzToolTipModule,
    NzIconModule,
    NzModalModule,
    ColorPickerComponent
  ],
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  animations: [slideInAnimation],
  standalone: true
})
export default class IndexComponent implements OnInit {
  constructor(
    public userInfoStore: UserInfoStore,
    private modal: NzModalService,
    private message: NzMessageService,
    private authenticateService: AuthenticateService,
    private router: Router,
    private route: ActivatedRoute,
    private menuStore: MenuStore,
    @Inject(GET_ACTIVE_ROUTE) private getActiveRoute: GET_ACTIVE_ROUTE_TYPE,
    public nzConfigService: NzConfigService
  ) {}
  isCollapsed = false
  logoSvg = 'assets/image/logo.svg'
  systemName = environment.SYSTEM_NAME
  menus: Menu[] = []
  breadcrumbs: {
    menuName: string
  }[] = []

  getRouteAnimationData() {
    return this.route.snapshot.url
  }

  getBreadcrumbList() {
    const route = this.getActiveRoute()
    this.breadcrumbs = [
      {
        menuName: route?.snapshot.data['menuName']
      }
    ]
  }

  colorPickerChange(color: ColorType) {
    this.nzConfigService.set('theme', {
      primaryColor: color.hex
    })
  }

  ngOnInit(): void {
    this.getBreadcrumbList()
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.getBreadcrumbList()
    })

    this.menuStore.data.subscribe((menuData) => {
      // 格式化 menuData
      const loop = (list: MenuDataItemType[], level: number, parentPath: string) => {
        const result: Menu[] = []
        list.forEach((item) => {
          if (!item.hidden) {
            const path = parentPath ? `${parentPath}${item.path}` : item.path
            if (item.children && item.children.length) {
              result.push({
                title: item.name,
                level,
                icon: item.icon ? item.icon.replace('Outlined', '').toLocaleLowerCase() : 'folder',
                children: loop(item.children, level + 1, path)
              })
            } else {
              result.push({
                title: item.name,
                path,
                level
              })
            }
          }
        })
        return result
      }
      this.menus = loop(menuData, 1, '')
    })
  }

  logout() {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定注销登录吗？',
      nzClosable: false,
      nzOnOk: () => {
        const messageRef = this.message.loading('正在注销，请稍等 ...', {
          nzDuration: 0
        })
        this.authenticateService.logout().subscribe({
          next: () => {
            tokenLocalforage.clear()
            this.message.remove(messageRef.messageId)
            this.router.navigate(['login'], { replaceUrl: true })
          },
          error: () => {
            this.message.remove(messageRef.messageId)
          }
        })
      }
    })
  }
}
