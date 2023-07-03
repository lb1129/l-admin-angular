import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import isAuthenticated from '@/app/auth/isAuthenticated'
import { map } from 'rxjs'

// 是否已登录跳转控制
export const authGuard = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router)
  return isAuthenticated.value.pipe(
    map((val) => {
      if (val) {
        if (route.data['needAuth'] === false) {
          router.navigate([''])
          return false
        }
      } else {
        if (route.data['needAuth'] == true) {
          router.navigate(['login'])
          return false
        }
      }
      return true
    })
  )
}
