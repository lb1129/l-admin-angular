import { Component, OnDestroy } from '@angular/core'
import { RouterModule, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms'
import { of, switchMap } from 'rxjs'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification'
import { TranslateService } from '@ngx-translate/core'
import LayoutComponent from '../layout/layout.component'
import { Validate } from '@/app/utils/validate'
import { AuthService } from '@/app/services/auth.service'
import { OtherService } from '@/app/services/other.service'

@Component({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    LayoutComponent
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  standalone: true
})
export default class RegisterComponent implements OnDestroy {
  form!: UntypedFormGroup
  submitLoading = false
  codeLoading = false
  codeTime = 0
  phoneCode = ''
  timer!: number

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private notification: NzNotificationService,
    public translate: TranslateService,
    private validate: Validate,
    private authService: AuthService,
    private otherService: OtherService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      // NOTE bind or 箭头函数
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]],
      phone: ['', [Validators.required, this.phoneValidator.bind(this)]],
      code: ['', Validators.required]
    })
  }
  ngOnDestroy() {
    clearInterval(this.timer)
  }

  passwordValidator(control: UntypedFormControl): Record<string, boolean> {
    if (control.value && !this.validate.isPassword(control.value))
      return { password: true, error: true }
    return {}
  }

  confirmPasswordValidator(control: UntypedFormControl): Record<string, boolean> {
    if (control.value && control.value !== this.form.controls['password'].value)
      return { confirmPassword: true, error: true }
    return {}
  }

  phoneValidator(control: UntypedFormControl): Record<string, boolean> {
    if (control.value && !this.validate.isPhone(control.value)) return { phone: true, error: true }
    return {}
  }

  getCodeText() {
    return this.translate.get(['retrieve', 'getVerificationCode']).pipe(
      switchMap((message) => {
        return of(
          this.codeTime > 0 ? `${message.retrieve}${this.codeTime}s` : message.getVerificationCode
        )
      })
    )
  }

  getCodeHandler(e: MouseEvent) {
    e.preventDefault()
    const phoneControl = this.form.controls['phone']
    phoneControl.markAsDirty()
    phoneControl.updateValueAndValidity({ onlySelf: true })
    if (phoneControl.valid) {
      this.codeLoading = true
      this.otherService.sendCode(Number(phoneControl.value)).subscribe({
        next: (res) => {
          // NOTE 短信服务暂未接入运营商 先直接显示在前端
          this.phoneCode = res.data
          this.codeTime = 60
          this.timer = window.setInterval(() => {
            if (this.codeTime <= 0) {
              this.phoneCode = ''
              clearInterval(this.timer)
            } else this.codeTime--
          }, 1000)
          this.codeLoading = false
        },
        error: () => {
          this.codeLoading = false
        }
      })
    }
  }

  submitHandler() {
    if (this.form.valid) {
      const value = this.form.value
      this.submitLoading = true
      this.authService
        .register({
          username: value.username,
          password: value.password,
          phone: Number(value.phone),
          code: value.code
        })
        .subscribe({
          next: () => {
            this.translate.get(['tip', 'registerSuccess']).subscribe((message) => {
              this.notification.success(message.tip, message.registerSuccess, {
                nzDuration: 2000
              })
              setTimeout(() => {
                this.router.navigate(['login'])
              }, 2000)
              this.submitLoading = false
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
