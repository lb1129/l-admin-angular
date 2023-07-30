import { Component, OnInit } from '@angular/core'
import { Route, Data, Router } from '@angular/router'
import { cloneDeep } from 'lodash-es'
import { AuthService } from '@/app/services/auth.service'
import { UserService } from '@/app/services/user.service'
import { MenuService } from '@/app/services/menu.service'
import { lazyLoad } from '@/app/utils/lazy-load'
import { RouteTools } from '@/app/utils/route-tools'
import type { MenuDataItemType } from '@/app/types/menu'
import { Store } from '@ngrx/store'
import { userInfoActions } from '@/app/stores/user-info/actions'
import { menuActions } from '@/app/stores/menu/actions'
import { menuSelectors } from '@/app/stores/menu/selectors'
import { Theme } from '@/app/utils/theme'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private menuService: MenuService,
    private store: Store,
    private router: Router,
    private routeTools: RouteTools,
    private theme: Theme
  ) {}

  hiddenInitLoading = false

  getChildrenPath(path: string) {
    if (/^\/.*/.test(path)) {
      return path.slice(1)
    }
    return path
  }

  ngOnInit() {
    // 主题色初始化
    this.theme.init()
    // 已登录 初始菜单数据 用户信息
    this.authService.isLogin().subscribe({
      next: () => {
        this.hiddenInitLoading = true
        // 获取菜单
        this.menuService.getMenu().subscribe((menuRes) => {
          // 更新菜单数据
          this.store.dispatch(menuActions.setMenu({ payload: menuRes.data }))
          // 更新菜单数据获取状态设置为完成
          this.store.dispatch(menuActions.setMenuDone())
          // 获取用户信息
          this.userService.getUserInfo().subscribe((userInfoRes) => {
            // 更新 userInfo store
            this.store.dispatch(userInfoActions.setUserInfo({ payload: userInfoRes.data }))
          })
        })
      },
      error: () => {
        this.hiddenInitLoading = true
        // 更新菜单数据获取状态设置为完成
        this.store.dispatch(menuActions.setMenuDone())
      }
    })
    // 用户菜单数据生成动态路由
    this.store.select(menuSelectors.menu).subscribe((menu) => {
      const generateRoutes = (list: MenuDataItemType[], indexRoute?: Route) => {
        const res: Route[] = []
        if (indexRoute) {
          res.push(indexRoute)
        }
        list.forEach((record) => {
          const children = record.children
          let path = this.getChildrenPath(record.path)
          if (children && children.length) {
            const redirectChild = children.find((child) => !child.hidden)
            let redirectRoute: Route | undefined
            if (redirectChild && redirectChild.pageUrl) {
              redirectRoute = {
                path: '',
                redirectTo: this.getChildrenPath(redirectChild.path),
                pathMatch: 'full'
              }
            }
            res.push({
              path,
              data: { needAuth: true, menuName: record.name },
              children: generateRoutes(children, redirectRoute)
            })
          } else if (record.pageUrl) {
            const data: Data = { needAuth: true, menuName: record.name }
            if (record.hidden) data['hidden'] = true
            const [moduleName, componentName] = record.pageUrl.split('/')
            const formatComponentName = componentName
              .replace(/\B([A-Z])/g, '-$1')
              .toLocaleLowerCase()

            // angular路由不支持可选参数 例如：productAddOrEdit/:id?
            // NOTE 如果不需要兼容 vue react 可以在菜单管理配成两条菜单路由
            const haveOptionalParameters = /:.+\?$/.test(record.path)
            if (haveOptionalParameters) {
              res.push({
                path: path.replace(/\/:.+$/, ''),
                redirectTo: path.replace(/:.+$/, '')
              })
              path = path.replace('?', '')
            }
            res.push({
              path,
              component: lazyLoad(moduleName, formatComponentName),
              // loadComponent: () =>
              //   import(
              //     `./pages/${moduleName}/${formatComponentName}/${formatComponentName}.component`
              //   ),
              data
            })
          }
        })
        return res
      }
      const routes = generateRoutes(menu.data)
      // 菜单获取状态为完成后
      if (menu.done) {
        const baseRoutes = cloneDeep(this.router.config)
        // 将动态路由插入
        const insertTo = baseRoutes[0].children
        if (insertTo && insertTo.length) {
          baseRoutes[0].children = [insertTo[0], ...routes, insertTo[insertTo.length - 1]]
        }
        // 删除404转圈
        delete baseRoutes[baseRoutes.length - 1].component
        // 为404路由添加loadComponent
        baseRoutes[baseRoutes.length - 1].loadComponent = () =>
          import('./pages/sundry/not-found/not-found.component')
        // 重设路由
        this.router.resetConfig(baseRoutes)
        // 触发重新匹配
        const { route } = this.routeTools.getActiveRoute()
        if (route.snapshot.routeConfig?.path === '**')
          this.router.navigateByUrl(this.router.url, { replaceUrl: true })
      }
    })
  }
}
