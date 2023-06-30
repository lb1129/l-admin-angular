import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

import { ProductType } from '../types'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less']
})
export class ProductDetailComponent {
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
