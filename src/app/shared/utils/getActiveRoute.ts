import { InjectionToken, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

export type GET_ACTIVE_ROUTE_TYPE = () => {
  route: ActivatedRoute
  routePath: ActivatedRoute[]
}

export const GET_ACTIVE_ROUTE = new InjectionToken<GET_ACTIVE_ROUTE_TYPE>('GET_ACTIVE_ROUTE', {
  providedIn: 'root',
  factory: () => {
    const route = inject(ActivatedRoute)
    return () => {
      // 路径
      let path = []
      let result = route
      let chidlren = [...route.children]
      // 往下递归 直到没有children或children为空
      while (chidlren.length) {
        const record = chidlren.pop()
        if (record) {
          // record不是末尾的子级 清空 开启新的路径
          if (
            path.length &&
            path[path.length - 1].children?.findIndex(
              (child) => child.snapshot.routeConfig?.path === record?.snapshot.routeConfig?.path
            ) === -1
          )
            path = []
          const child = record.children
          if (!child || !child.length) {
            path.push(record)
            result = record
            break
          } else {
            path.push(record)
            chidlren = [...child, ...chidlren]
          }
        }
      }
      return {
        route: result,
        routePath: path
      }
    }
  }
})
