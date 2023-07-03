import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import isAuthenticated from '@/app/auth/isAuthenticated'
import { map } from 'rxjs'
import { RouteSnapshotStore } from '@/app/stores/routeSnapshot'

// 是否已登录跳转控制
export const authGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  const routeSnapshotStore = inject(RouteSnapshotStore)
  // 更新 routeSnapshot store
  routeSnapshotStore.setData(route)
  return isAuthenticated.value.pipe(
    map((val) => {
      if (val) {
        if (route.data['needAuth'] === false) {
          router.navigate([''], { replaceUrl: true })
          return false
        }
      } else {
        if (route.data['needAuth'] == true) {
          router.navigate(['login'], { replaceUrl: true })
          return false
        }
      }
      return true
    })
  )
}
