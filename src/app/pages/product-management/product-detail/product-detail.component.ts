import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzButtonModule } from 'ng-zorro-antd/button'

import { ProductType } from '../types'

@Component({
  imports: [NzPageHeaderModule, NzDescriptionsModule, NzSkeletonModule, NzButtonModule],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  standalone: true
})
export default class ProductDetailComponent {
  constructor(private router: Router, private location: Location) {}
  details: ProductType = {
    id: '1',
    name: 'AppleMacBook Air',
    brand: 'Apple',
    category: '电脑整机/笔记本',
    price: 7199.0,
    color: '深空灰色',
    style: '13.3英寸 M1芯片 8+7核 8G+256G',
    enable: true,
    inventory: 33,
    describe: ''
  }
  backHandler() {
    this.location.back()
  }
  editHandler() {
    this.router.navigate(['/productManagement/productAddOrEdit/', this.details.id])
  }
}
