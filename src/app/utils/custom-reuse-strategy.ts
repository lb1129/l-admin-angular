import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  Route,
  RouteReuseStrategy
} from '@angular/router'

export class CustomReuseStrategy implements RouteReuseStrategy {
  private handlers: Map<Route, DetachedRouteHandle> = new Map()

  needDetach = false

  // 确定是否应复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // 如果curr是菜单路由 那路由就分离
    let children = [...curr.children]
    while (children.length) {
      const record = children.pop()
      if (record) {
        const child = record.children
        if (child && child.length) {
          children = [...child, ...children]
        } else {
          if (!record.data['hidden']) {
            this.needDetach = true
          } else {
            this.needDetach = false
          }
          break
        }
      }
    }
    return future.routeConfig === curr.routeConfig
  }

  // 确定是否应分离此路由（及其子树）以便以后复用
  shouldDetach(route: ActivatedRouteSnapshot) {
    return route.routeConfig?.path === '**' ? false : this.needDetach ? true : false
  }

  // 存储分离的路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (!route.routeConfig) return
    // 仅缓存一个
    this.handlers.clear()
    this.handlers.set(route.routeConfig, handle)
  }

  // 确定是否应重新连接此路由（及其子树）
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers.get(route.routeConfig)
  }

  // 检索以前存储的路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || !this.handlers.has(route.routeConfig)) return null
    return this.handlers.get(route.routeConfig) as DetachedRouteHandle
  }
}
