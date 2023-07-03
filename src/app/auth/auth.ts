import { Injectable } from '@angular/core'
import { MenuStore } from '@/app/stores/menu'
import { RouteSnapshotStore } from '@/app/stores/routeSnapshot'
import type { OperateAuthType, MenuDataItemType } from '@/app/pages/personal-center/types'

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private menuStore: MenuStore, private routeSnapshotStore: RouteSnapshotStore) {}

  operateAuth: OperateAuthType = {}
  // TODO 其他权限...

  operateAuthValueToDisabled(operateAuthValue?: number) {
    // 值为0 无权限 返回true
    // 值为空 或 1 有权限 则返回false
    if (operateAuthValue === 0) return true
    return false
  }

  init() {
    this.menuStore.data.subscribe((menuData) => {
      let operateAuth: OperateAuthType = {}
      let iterativeMenuData = [...menuData]
      while (iterativeMenuData.length) {
        const record = iterativeMenuData.shift() as MenuDataItemType
        if (record.path === `/${this.routeSnapshotStore.data.routeConfig?.path}`) {
          if (record.operateAuth) operateAuth = record.operateAuth
          break
        } else if (record.children && record.children.length) {
          iterativeMenuData = [...record.children, ...record.children]
        }
      }
      this.operateAuth = operateAuth
    })
  }
}
