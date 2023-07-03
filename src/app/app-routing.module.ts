import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { environment } from '@/environments/environment'
import { authGuard } from '@/app/auth/guard'

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    loadComponent: () => import('./pages/index/index/index.component'),
    data: { needAuth: true },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/index/home/home.component'),
        data: { needAuth: true }
      },
      {
        path: 'productManagement',
        children: [
          { path: '', redirectTo: 'productList', pathMatch: 'full' },
          {
            path: 'productList',
            loadComponent: () =>
              import('./pages/product-management/product-list/product-list.component'),
            data: { needAuth: true }
          },
          {
            path: 'productDetail/:id',
            loadComponent: () =>
              import('./pages/product-management/product-detail/product-detail.component'),
            data: { needAuth: true }
          },
          {
            path: 'productAddOrEdit',
            redirectTo: 'productAddOrEdit/'
          },
          {
            path: 'productAddOrEdit/:id',
            loadComponent: () =>
              import(
                './pages/product-management/product-add-or-edit/product-add-or-edit.component'
              ),
            data: { needAuth: true }
          }
        ]
      },
      {
        path: 'personalCenter',
        loadComponent: () => import('./pages/personal-center/index/index.component'),
        data: { needAuth: true }
      }
    ]
  },
  {
    path: 'login',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/authenticate/login/login.component'),
    data: { needAuth: false }
  },
  {
    path: 'register',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/authenticate/register/register.component'),
    data: { needAuth: false }
  },
  {
    path: 'findPassword',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/authenticate/find-password/find-password.component'),
    data: { needAuth: false }
  },
  {
    path: 'privacyPolicy',
    loadComponent: () => import('./pages/sundry/privacy-policy/privacy-policy.component')
  },
  {
    path: '**',
    loadComponent: () => import('./pages/sundry/not-found/not-found.component')
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.NOT_SUPPORT_HISTORY
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
