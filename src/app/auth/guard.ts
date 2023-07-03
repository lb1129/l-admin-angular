import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import isAuthenticated from '@/app/auth/isAuthenticated'
import { map } from 'rxjs'
import { RouteSnapshot } from '@/app/stores/routeSnapshot'

// 是否已登录跳转控制
export const authGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  const routeSnapshot = inject(RouteSnapshot)
  // 更新 routeSnapshot store
  routeSnapshot.setData(route)
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
