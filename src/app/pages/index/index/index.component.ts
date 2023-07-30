import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router, NavigationEnd } from '@angular/router'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'
import { NzMessageService } from 'ng-zorro-antd/message'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from '@/app/services/auth.service'
import { TokenLocalforage } from '@/app/storage/localforage'
import {
  ColorPickerComponent,
  ColorType
} from '@/app/components/color-picker/color-picker.component'
import { ToggleLanguageComponent } from '@/app/components/toggle-language/toggle-language.component'
import { environment } from '@/environments/environment'
import { RouteTools } from '@/app/utils/route-tools'
import type { MenuDataItemType } from '@/app/types/menu'
import { slideInAnimation } from './animations'
import { Store } from '@ngrx/store'
import { userInfoSelectors } from '@/app/stores/user-info/selectors'
import { menuSelectors } from '@/app/stores/menu/selectors'
import { userInfoActions } from '@/app/stores/user-info/actions'
import { Theme } from '@/app/utils/theme'

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
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
    public translate: TranslateService,
    private authService: AuthService,
    private store: Store,
    private tokenLocalforage: TokenLocalforage,
    private routeTools: RouteTools,
    private theme: Theme
  ) {}
  isCollapsed = false
  logoSvg = 'assets/image/logo.svg'
  systemName = environment.SYSTEM_NAME
  menus: Menu[] = []
  breadcrumbs: { menuName: string; url: string }[] = []
  avatar = this.store.select(userInfoSelectors.avatar)
  nickname = this.store.select(userInfoSelectors.nickname)
  themeColor = this.theme.get()

  colorPickerChange(color: ColorType) {
    this.theme.set(color.hex)
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
    // 初始面包屑
    this.setBreadcrumbs()
    // 路由跳转完成 更新面包屑
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setBreadcrumbs()
      }
    })

    this.store.select(menuSelectors.menuData).subscribe((menuData) => {
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
            this.authService.logout().subscribe({
              next: () => {
                this.tokenLocalforage.clear()
                this.message.remove(messageRef.messageId)
                this.router.navigate(['login'], { replaceUrl: true })
                this.store.dispatch(userInfoActions.resetUserInfo())
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
