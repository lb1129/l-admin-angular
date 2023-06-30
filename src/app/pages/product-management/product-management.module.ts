import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { ProductManagementRoutingModule } from './product-management-routing.module'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'
import { ProductAddOrEditComponent } from './product-add-or-edit/product-add-or-edit.component'

import { NzTableModule } from 'ng-zorro-antd/table'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzIconModule } from 'ng-zorro-antd/icon'

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, ProductAddOrEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductManagementRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzDividerModule,
    NzInputModule,
    NzPopconfirmModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzFormModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzIconModule
  ]
})
export class ProductManagementModule {}
