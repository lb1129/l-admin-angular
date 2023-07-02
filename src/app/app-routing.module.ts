import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { environment } from '@/environments/environment'

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/index/index/index.component'),
    children: [
      { path: '', loadComponent: () => import('./pages/index/home/home.component') },
      {
        path: 'productManagement',
        children: [
          { path: '', redirectTo: 'productList', pathMatch: 'full' },
          {
            path: 'productList',
            loadComponent: () =>
              import('./pages/product-management/product-list/product-list.component')
          },
          {
            path: 'productDetail/:id',
            loadComponent: () =>
              import('./pages/product-management/product-detail/product-detail.component')
          },
          {
            path: 'productAddOrEdit',
            redirectTo: 'productAddOrEdit/'
          },
          {
            path: 'productAddOrEdit/:id',
            loadComponent: () =>
              import('./pages/product-management/product-add-or-edit/product-add-or-edit.component')
          }
        ]
      },
      {
        path: 'personalCenter',
        loadComponent: () => import('./pages/personal-center/index/index.component')
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authenticate/login/login.component')
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/authenticate/register/register.component')
  },
  {
    path: 'findPassword',
    loadComponent: () => import('./pages/authenticate/find-password/find-password.component')
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
