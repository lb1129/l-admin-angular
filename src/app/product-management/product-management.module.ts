import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProductManagementRoutingModule } from './product-management-routing.module'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductAddOrEditComponent } from './product-add-or-edit/product-add-or-edit.component'

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductAddOrEditComponent],
  imports: [CommonModule, ProductManagementRoutingModule]
})
export class ProductManagementModule {}
