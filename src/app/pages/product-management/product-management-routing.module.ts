import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductAddOrEditComponent } from './product-add-or-edit/product-add-or-edit.component'

const routes: Routes = [
  { path: '', redirectTo: 'productList', pathMatch: 'full' },
  { path: 'productList', component: ProductListComponent },
  { path: 'productDetail/:id', component: ProductDetailComponent },
  { path: 'productAddOrEdit/:id?', component: ProductAddOrEditComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule {}
