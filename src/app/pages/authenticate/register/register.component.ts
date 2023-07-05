import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import LayoutComponent from '../layout/layout.component'

import { TranslateService } from '@ngx-translate/core'

@Component({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    LayoutComponent
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  standalone: true
})
export default class RegisterComponent {
  form!: UntypedFormGroup

  constructor(private fb: UntypedFormBuilder, public translate: TranslateService) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      code: ['', Validators.required]
    })
  }

  submitHandler() {
    if (this.form.valid) {
      const value = this.form.value
      console.log(value)
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
