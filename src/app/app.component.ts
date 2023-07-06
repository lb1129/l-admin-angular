import { Component, Inject, OnInit } from '@angular/core'
import { Route, Data, Router } from '@angular/router'

import { AuthenticateService } from '@/app/pages/authenticate/services'
import { PersonalCenterService } from '@/app/pages/personal-center/service'

import { MenuStore } from '@/app/stores/menu'
import { UserInfoStore } from '@/app/stores/userInfo'
import type { MenuDataItemType } from '@/app/pages/personal-center/types'
import { lazyLoad } from '@/app/shared/utils/lazyLoad'
import { GET_ACTIVE_ROUTE, GET_ACTIVE_ROUTE_TYPE } from '@/app/shared/utils/getActiveRoute'

import { cloneDeep } from 'lodash-es'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private authenticateService: AuthenticateService,
    private personalCenterService: PersonalCenterService,
    private menuStore: MenuStore,
    private userInfoStore: UserInfoStore,
    private router: Router,
    @Inject(GET_ACTIVE_ROUTE) private getActiveRoute: GET_ACTIVE_ROUTE_TYPE
  ) {}

  getChildrenPath(path: string) {
    if (/^\/.*/.test(path)) {
      return path.slice(1)
    }
    return path
  }

  ngOnInit() {
    // 已登录 初始菜单数据 用户信息
    this.authenticateService.isLogin().subscribe({
      next: () => {
        // 获取菜单
        this.personalCenterService.getMenu().subscribe((menuRes) => {
          // 更新 menu store
          this.menuStore.setData(menuRes.data)
          // 获取用户信息
          this.personalCenterService.getUserInfo().subscribe((userInfoRes) => {
            // 更新 userInfo store
            this.userInfoStore.setData(userInfoRes.data)
          })
        })
      },
      error: () => {
        // 未登录 将 menu store 置为空
        this.menuStore.setData([])
      }
    })
    // 用户菜单数据生成动态路由
    this.menuStore.data.subscribe((menuData) => {
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
      const routes = generateRoutes(menuData)

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
      const { route } = this.getActiveRoute()
      if (route.snapshot.routeConfig?.path === '**')
        this.router.navigateByUrl(this.router.url, { replaceUrl: true })
    })
  }
}
