import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router'
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMessageService } from 'ng-zorro-antd/message'
import { TranslateService } from '@ngx-translate/core'
import { ResizeDirective, type ResizeChangeRes } from '@/app/directives/resize/resize.directive'
import { Auth } from '@/app/auth/auth'
import { ProductService } from '@/app/services/product.service'
import type { ProductType } from '@/app/types/product'
import { productEditDone } from '@/app/pubsub'
import { Subscription } from 'rxjs'

interface Column {
  title: string
  dataIndex: keyof ProductType
  width?: string
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  align?: 'left' | 'center' | 'right'
}

@Component({
  imports: [
    CommonModule,
    RouterModule,
    NzTableModule,
    NzButtonModule,
    NzDividerModule,
    NzInputModule,
    NzPopconfirmModule,
    NzIconModule,
    ResizeDirective
  ],
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  standalone: true
})
export default class ProductListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    public translate: TranslateService,
    private productService: ProductService,
    private message: NzMessageService,
    public auth: Auth
  ) {}

  allChecked = false
  indeterminate = false
  setOfCheckedId = new Set<string>()
  y = '0px'
  loading = true
  keyword = ''
  pageIndex = 1
  pageSize = 10
  total = 0
  dataSource: ProductType[] = []
  columns: Column[] = [
    {
      title: '名称',
      dataIndex: 'name',
      width: '150px',
      fixed: 'left'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      width: '150px'
    },
    {
      title: '类别',
      dataIndex: 'category',
      width: '150px'
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: '150px',
      align: 'center'
    },
    {
      title: '颜色',
      dataIndex: 'color',
      width: '150px'
    },
    {
      title: '款式',
      dataIndex: 'style',
      width: '150px',
      ellipsis: true
    },
    {
      title: '是否启用',
      dataIndex: 'enable',
      width: '150px'
    },
    {
      title: '库存',
      dataIndex: 'inventory',
      width: '150px'
    },
    {
      title: '描述',
      dataIndex: 'describe',
      width: '150px'
    }
  ]
  productEditDoneSub!: Subscription

  ngOnInit() {
    this.productEditDoneSub = productEditDone.subscribe(() => {
      this.loadData()
    })
  }

  ngOnDestroy() {
    this.productEditDoneSub.unsubscribe()
  }

  addHandler() {
    this.router.navigate(['/productManagement/productAddOrEdit'])
  }

  resizeChangeHandler(params: ResizeChangeRes) {
    this.y = `${params.height - (64.8 + 64 + 54.8)}px`
  }

  deleteHandler(id?: string) {
    const ids = id ? [id] : [...this.setOfCheckedId]
    this.loading = true
    this.productService.deleteProductByIds(ids).subscribe({
      next: () => {
        this.translate.get('delete').subscribe((message) => {
          this.translate.get('whatSuccess', { value: message }).subscribe((message) => {
            this.message.success(message)
            this.loading = false
            this.loadData()
          })
        })
      },
      error: () => {
        this.loading = false
      }
    })
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id)
    } else {
      this.setOfCheckedId.delete(id)
    }
  }

  refreshCheckedStatus(): void {
    this.allChecked =
      !!this.dataSource.length && this.dataSource.every(({ _id }) => this.setOfCheckedId.has(_id))
    this.indeterminate =
      this.dataSource.some(({ _id }) => this.setOfCheckedId.has(_id)) && !this.allChecked
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked)
    this.refreshCheckedStatus()
  }

  onAllChecked(checked: boolean): void {
    this.dataSource.forEach(({ _id }) => this.updateCheckedSet(_id, checked))
    this.refreshCheckedStatus()
  }

  searchHadnler(value: string) {
    if (this.keyword !== value) {
      this.keyword = value
      this.loadData()
    }
  }

  loadData() {
    this.loading = true
    this.productService
      .getProducts({
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        keyword: this.keyword
      })
      .subscribe({
        next: (res) => {
          this.dataSource = res.data.data
          this.total = res.data.total
          this.refreshCheckedStatus()
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      })
  }

  queryParamsHandler(params: NzTableQueryParams) {
    const {
      pageSize,
      pageIndex
      // sort, filter
    } = params
    this.pageIndex = pageIndex
    this.pageSize = pageSize
    this.loadData()
  }
}
