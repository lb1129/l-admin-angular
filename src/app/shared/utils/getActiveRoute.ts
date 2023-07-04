import { InjectionToken, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

export type GET_ACTIVE_ROUTE_TYPE = () => ActivatedRoute

export const GET_ACTIVE_ROUTE = new InjectionToken<GET_ACTIVE_ROUTE_TYPE>('GET_ACTIVE_ROUTE', {
  providedIn: 'root',
  factory: () => {
    const route = inject(ActivatedRoute)
    return () => {
      let result = route
      let chidlren = [...route.children]
      // 往下递归 直到没有children或children为空
      while (chidlren.length) {
        const record = chidlren.pop()
        if (record) {
          const child = record.children
          if (!child || !child.length) {
            result = record
            break
          } else {
            chidlren = [...child, ...chidlren]
          }
        }
      }
      return result
    }
  }
})
