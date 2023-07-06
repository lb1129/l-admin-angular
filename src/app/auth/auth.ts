import { Inject, Injectable } from '@angular/core'
import { MenuStore } from '@/app/stores/menu'
import type { OperateAuthType, MenuDataItemType } from '@/app/pages/personal-center/types'
import { GET_ACTIVE_ROUTE, GET_ACTIVE_ROUTE_TYPE } from '@/app/shared/utils/getActiveRoute'
import { Observable, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(
    private menuStore: MenuStore,
    @Inject(GET_ACTIVE_ROUTE) private getActiveRoute: GET_ACTIVE_ROUTE_TYPE
  ) {}

  operateAuthValueToDisabled(operateAuthValue?: number) {
    // 值为0 无权限 返回true
    // 值为空 或 1 有权限 则返回false
    if (operateAuthValue === 0) return true
    return false
  }

  getOperateAuth(operate: keyof OperateAuthType): Observable<boolean> {
    return this.menuStore.data.pipe(
      switchMap((menuData) => {
        let operateAuth: OperateAuthType = {}
        let iterativeMenuData = [...menuData]
        const { route } = this.getActiveRoute()
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
