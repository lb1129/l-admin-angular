import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router'

export class CustomReuseStrategy implements RouteReuseStrategy {
  private cacheRouters = new Map<string, DetachedRouteHandle>()

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
    // 仅缓存一个
    this.cacheRouters.clear()
    this.cacheRouters.set(this.getFullRouteURL(route), handle)
  }

  // 确定是否应重新连接此路由（及其子树）
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.cacheRouters.get(this.getFullRouteURL(route))
  }

  // 检索以前存储的路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const cache = this.cacheRouters.get(this.getFullRouteURL(route))
    return cache || null
  }

  //获取完整路由路径
  private getFullRouteURL(route: ActivatedRouteSnapshot): string {
    const { pathFromRoot } = route
    let fullRouteUrlPath: string[] = []
    pathFromRoot.forEach((item: ActivatedRouteSnapshot) => {
      fullRouteUrlPath = fullRouteUrlPath.concat(this.getRouteUrlPath(item))
    })
    return `/${fullRouteUrlPath.join('/')}`
  }

  private getRouteUrlPath(route: ActivatedRouteSnapshot) {
    return route.url.map((urlSegment) => urlSegment.path)
  }
}
