import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzButtonModule } from 'ng-zorro-antd/button'

import type { ProductType } from '../types'
import { ProductService } from '../services'

@Component({
  imports: [NzPageHeaderModule, NzDescriptionsModule, NzSkeletonModule, NzButtonModule],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  standalone: true
})
export default class ProductDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  details: ProductType = {
    id: '',
    name: '',
    brand: '',
    category: '',
    price: 0,
    color: '',
    style: '',
    enable: true,
    inventory: 0,
    describe: ''
  }
  loading = false

  loadData() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.loading = true
      this.productService.getProductById(id).subscribe({
        next: (res) => {
          this.details = res.data
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      })
    }
  }

  ngOnInit() {
    this.loadData()
  }

  backHandler() {
    this.location.back()
  }

  editHandler() {
    this.router.navigate(['/productManagement/productAddOrEdit/', this.details.id])
  }
}
