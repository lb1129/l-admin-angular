import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { RouteTools } from '@/app/utils/route-tools'
import type { OperateAuthType, MenuDataItemType } from '@/app/types/menu'
import { Store } from '@ngrx/store'
import { menuSelectors } from '@/app/stores/menu/selectors'

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private store: Store, private routeTools: RouteTools) {}

  operateAuthValueToDisabled(operateAuthValue?: number) {
    // 值为0 无权限 返回true
    // 值为空 或 1 有权限 则返回false
    if (operateAuthValue === 0) return true
    return false
  }

  getOperateAuth(operate: keyof OperateAuthType): Observable<boolean> {
    return this.store.select(menuSelectors.menuData).pipe(
      switchMap((menuData) => {
        let operateAuth: OperateAuthType = {}
        let iterativeMenuData = [...menuData]
        const { route } = this.routeTools.getActiveRoute()
        while (iterativeMenuData.length) {
          const record = iterativeMenuData.shift() as MenuDataItemType
          if (record.path === `/${route.routeConfig?.path}`) {
            if (record.operateAuth) operateAuth = record.operateAuth
            break
          } else if (record.children && record.children.length) {
            iterativeMenuData = [...record.children, ...record.children]
          }
        }
        return of(this.operateAuthValueToDisabled(operateAuth[operate]))
      })
    )
  }
}
