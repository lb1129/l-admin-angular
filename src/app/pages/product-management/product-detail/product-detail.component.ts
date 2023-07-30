import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location, CommonModule } from '@angular/common'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzImageModule } from 'ng-zorro-antd/image'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from '@/app/auth/service'
import { ProductService } from '@/app/services/product.service'
import type { ProductType } from '@/app/types/product'

@Component({
  imports: [
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzButtonModule,
    NzImageModule,
    CommonModule
  ],
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
    public translate: TranslateService,
    public auth: AuthService,
    private productService: ProductService
  ) {}
  details: ProductType = {
    _id: '',
    name: '',
    brand: '',
    category: '',
    price: 0,
    color: '',
    style: '',
    enable: true,
    inventory: 0,
    describe: '',
    images: []
  }
  loading = false

  ngOnInit() {
    this.loadData()
  }

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

  backHandler() {
    this.location.back()
  }

  editHandler() {
    this.router.navigate(['/productManagement/productAddOrEdit/', this.details._id])
  }
}
