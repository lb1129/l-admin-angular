import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { environment } from '@/environments/environment'
import { authGuard } from '@/app/auth/guard'
import { PageLoadingComponent } from '@/app/components/page-loading/page-loading.component'
import { lazyLoad } from '@/app/utils/lazy-load'

const baseRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    component: lazyLoad('index', 'index'),
    // loadComponent: () => import('./pages/index/index/index.component'),
    data: { needAuth: true, menuName: 'index' },
    children: [
      {
        path: '',
        component: lazyLoad('index', 'home'),
        // loadComponent: () => import('./pages/index/home/home.component'),
        data: { needAuth: true, menuName: 'homePage' }
      },
      {
        path: 'personalCenter',
        component: lazyLoad('personal-center', 'index'),
        // loadComponent: () => import('./pages/personal-center/index/index.component'),
        data: { needAuth: true, menuName: 'personalCenter' },
        children: [
          {
            path: '',
            redirectTo: 'basicInfo',
            pathMatch: 'full'
          },
          {
            path: 'basicInfo',
            component: lazyLoad('personal-center', 'basic-info'),
            data: { needAuth: true, menuName: 'basicInfo' }
          },
          {
            path: 'securitySetting',
            component: lazyLoad('personal-center', 'security-setting'),
            data: { needAuth: true, menuName: 'securitySetting' }
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    canActivate: [authGuard],
    component: lazyLoad('authenticate', 'login'),
    // loadComponent: () => import('./pages/authenticate/login/login.component'),
    data: { needAuth: false }
  },
  {
    path: 'register',
    canActivate: [authGuard],
    component: lazyLoad('authenticate', 'register'),
    // loadComponent: () => import('./pages/authenticate/register/register.component'),
    data: { needAuth: false }
  },
  {
    path: 'findPassword',
    canActivate: [authGuard],
    component: lazyLoad('authenticate', 'find-password'),
    // loadComponent: () => import('./pages/authenticate/find-password/find-password.component'),
    data: { needAuth: false }
  },
  {
    path: 'privacyPolicy',
    canActivate: [authGuard],
    component: lazyLoad('sundry', 'privacy-policy')
    // loadComponent: () => import('./pages/sundry/privacy-policy/privacy-policy.component')
  },
  {
    path: '**',
    canActivate: [authGuard],
    component: PageLoadingComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(baseRoutes, {
      useHash: environment.NOT_SUPPORT_HISTORY
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
