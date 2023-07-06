import { Injectable } from '@angular/core'
import { MenuStore } from '@/app/stores/menu'
import type { OperateAuthType, MenuDataItemType } from '@/app/pages/personal-center/types'
import { RouteTools } from '@/app/utils/route-tools'
import { Observable, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private menuStore: MenuStore, private routeTools: RouteTools) {}

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
