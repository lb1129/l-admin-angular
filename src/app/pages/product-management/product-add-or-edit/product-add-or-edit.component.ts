import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
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

@Component({
  imports: [
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzSkeletonModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzFormModule,
    NzCheckboxModule
  ],
  selector: 'app-product-add-or-edit',
  templateUrl: './product-add-or-edit.component.html',
  styleUrls: ['./product-add-or-edit.component.less'],
  standalone: true
})
export default class ProductAddOrEditComponent implements OnInit {
  form!: UntypedFormGroup

  constructor(private location: Location, private fb: UntypedFormBuilder) {}

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
      describe: ['']
    })
  }

  backHandler() {
    this.location.back()
  }

  saveHandler() {
    if (this.form.valid) {
      // const value = this.form.value
      this.location.back()
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
