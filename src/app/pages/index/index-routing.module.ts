import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { IndexComponent } from './index/index.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'productManagement',
        loadChildren: () =>
          import('../product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          )
      },
      {
        path: 'personalCenter',
        loadChildren: () =>
          import('../personal-center/personal-center.module').then((m) => m.PersonalCenterModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {}
