import { Component, OnInit } from '@angular/core'
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
import { TokenLocalforage } from '@/app/storage/localforage'

import { environment } from '@/environments/environment'

import { MenuStore } from '@/app/stores/menu'
import type { MenuDataItemType } from '@/app/pages/personal-center/types'

import { RouteTools } from '@/app/utils/route-tools'
import {
  ColorPickerComponent,
  ColorType
} from '@/app/components/color-picker/color-picker.component'
import { slideInAnimation } from './animations'

import { NzConfigService } from 'ng-zorro-antd/core/config'

import { ToggleLanguageComponent } from '@/app/components/toggle-language/toggle-language.component'

import { TranslateService } from '@ngx-translate/core'

import { ThemeLocalforage } from '@/app/storage/localforage'
import { ThemeStore } from '@/app/stores/theme'

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
    ColorPickerComponent,
    ToggleLanguageComponent
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
    public nzConfigService: NzConfigService,
    public translate: TranslateService,
    public tokenLocalforage: TokenLocalforage,
    public routeTools: RouteTools,
    private themeLocalforage: ThemeLocalforage,
    public themeStore: ThemeStore
  ) {}
  isCollapsed = false
  logoSvg = 'assets/image/logo.svg'
  systemName = environment.SYSTEM_NAME
  menus: Menu[] = []
  breadcrumbs: { menuName: string; url: string }[] = []
  userName = ''
  themeColor!: string

  getRouteAnimationData() {
    return this.route.snapshot.url
  }

  colorPickerChange(color: ColorType) {
    this.nzConfigService.set('theme', {
      primaryColor: color.hex
    })
    this.themeLocalforage.set(color.hex)
  }

  getSubmenuOpen(path: string) {
    const { routePath } = this.routeTools.getActiveRoute()
    return routePath.findIndex((route) => '/' + route.snapshot.routeConfig?.path === path) !== -1
  }

  setBreadcrumbs() {
    const { routePath } = this.routeTools.getActiveRoute()
    this.breadcrumbs = routePath.slice(1).map((item) => ({
      menuName: item.snapshot.data['menuName'],
      url: item.snapshot.url.map((item) => item.path).join('/')
    }))
  }

  ngOnInit() {
    // 订阅主题色
    this.themeStore.data.subscribe((themeColor) => {
      this.themeColor = themeColor
    })

    // 订阅用户信息
    this.userInfoStore.data.subscribe((userInfo) => {
      this.userName = userInfo.userName
    })

    // 初始面包屑
    this.setBreadcrumbs()
    // 路由跳转完成 更新面包屑
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBreadcrumbs()
      }
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
                path,
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
    this.translate
      .get(['tip', 'areYouSureToLogOut', 'signingOutPleaseWait'])
      .subscribe((messages) => {
        this.modal.confirm({
          nzTitle: messages.tip,
          nzContent: messages.areYouSureToLogOut,
          nzClosable: false,
          nzOnOk: () => {
            const messageRef = this.message.loading(messages.signingOutPleaseWait, {
              nzDuration: 0
            })
            this.authenticateService.logout().subscribe({
              next: () => {
                this.tokenLocalforage.clear()
                this.message.remove(messageRef.messageId)
                this.router.navigate(['login'], { replaceUrl: true })
              },
              error: () => {
                this.message.remove(messageRef.messageId)
              }
            })
          }
        })
      })
  }
}
