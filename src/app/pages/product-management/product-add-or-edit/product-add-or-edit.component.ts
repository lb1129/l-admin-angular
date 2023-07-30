import { Component, OnInit } from '@angular/core'
import { Location, CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms'
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header'
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions'
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzUploadFile, NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { TranslateService } from '@ngx-translate/core'
import { ProductService } from '@/app/services/product.service'
import { FileService } from '@/app/services/file.service'
import { productEditDone } from '@/app/pubsub'

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    NzUploadModule,
    NzIconModule,
    NzCheckboxModule
  ],
  selector: 'app-product-add-or-edit',
  templateUrl: './product-add-or-edit.component.html',
  styleUrls: ['./product-add-or-edit.component.less'],
  standalone: true
})
export default class ProductAddOrEditComponent implements OnInit {
  form!: UntypedFormGroup
  loading = false
  id = ''
  submitLoading = false
  fileList: NzUploadFile[] = []

  constructor(
    private location: Location,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private message: NzMessageService,
    public translate: TranslateService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      color: ['', Validators.required],
      inventory: [0, Validators.required],
      style: ['', Validators.required],
      enable: [true],
      describe: [''],
      images: [[]]
    })
    this.id = this.route.snapshot.paramMap.get('id') ?? ''
    if (this.id) {
      this.loading = true
      this.productService.getProductById(this.id).subscribe({
        next: (res) => {
          const {
            name,
            brand,
            category,
            price,
            color,
            inventory,
            style,
            enable,
            describe,
            images
          } = res.data
          this.form.setValue({
            name,
            brand,
            category,
            price,
            color,
            inventory,
            style,
            enable,
            describe,
            images
          })
          this.fileList = images.map((url, idx) => ({
            uid: `${idx}`,
            name: '',
            status: 'done',
            url
          }))
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      })
    }
  }

  beforeUploadHandler = (file: NzUploadFile, files: NzUploadFile[]) => {
    const len = this.fileList.length
    const canUploadFiles = files.slice(0, 5 - len)
    return canUploadFiles.some((item) => item.uid === file.uid)
  }

  customRequestHandler = (ops: NzUploadXHRArgs) => {
    const uid = ops.file.uid
    return this.fileService
      .upload(ops.file as unknown as File, (percent) => {
        ops.onProgress && ops.onProgress({ percent: percent }, ops.file)
      })
      .subscribe({
        next: (url) => {
          const idx = this.fileList.findIndex((item) => item.uid === uid)
          if (idx > -1) {
            this.fileList.splice(idx, 1, {
              uid,
              name: '',
              status: 'done',
              url
            })
          }
          ops.onSuccess && ops.onSuccess(url, ops.file, null)
        },
        error: () => {
          const idx = this.fileList.findIndex((item) => item.uid === uid)
          if (idx > -1) {
            this.fileList.splice(idx, 1, {
              uid,
              name: '',
              status: 'error',
              url: ''
            })
          }
          ops.onError && ops.onError(false, ops.file)
        }
      })
  }

  backHandler() {
    this.location.back()
  }

  saveHandler() {
    if (this.form.valid) {
      const value = this.form.value
      this.submitLoading = true
      if (this.id) value._id = this.id
      const images: string[] = []
      // 取出状态为done的url
      this.fileList.forEach((file) => {
        if (file.status === 'done') images.push(file.url as string)
      })
      value.images = images
      this.productService.saveProduct(value).subscribe({
        next: () => {
          this.translate.get('save').subscribe((message) => {
            this.translate.get('whatSuccess', { value: message }).subscribe((message) => {
              this.submitLoading = false
              productEditDone.next(true)
              this.message.success(message)
              this.location.back()
            })
          })
        },
        error: () => {
          this.submitLoading = false
        }
      })
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
    }
  }
}
