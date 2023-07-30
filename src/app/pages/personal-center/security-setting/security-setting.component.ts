import { Component, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { NzListModule } from 'ng-zorro-antd/list'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { Store } from '@ngrx/store'
import { userInfoSelectors } from '@/app/stores/user-info/selectors'
import { of, switchMap } from 'rxjs'
import { Validate } from '@/app/utils/validate'
import { OtherService } from '@/app/services/other.service'
import { UserService } from '@/app/services/user.service'
import { userInfoActions } from '@/app/stores/user-info/actions'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzListModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule
  ],
  selector: 'app-security-setting',
  templateUrl: './security-setting.component.html',
  styleUrls: ['./security-setting.component.less'],
  standalone: true
})
export default class SecuritySettingComponent implements OnDestroy {
  form!: UntypedFormGroup
  visible = false
  submitLoading = false
  codeLoading = false
  codeTime = 0
  phoneCode = ''
  timer!: number
  phone = this.store.select(userInfoSelectors.userInfo).pipe(
    switchMap((res) => {
      if (res.phone) return of(res.phone)
      return this.translate.get('none')
    })
  )

  constructor(
    public translate: TranslateService,
    private store: Store,
    private fb: UntypedFormBuilder,
    private validate: Validate,
    private otherService: OtherService,
    private userService: UserService,
    private message: NzMessageService
  ) {
    this.form = this.fb.group({
      phone: ['', [Validators.required, this.phoneValidator]],
      code: ['', Validators.required]
    })
  }

  editHandler() {
    this.visible = true
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }

  phoneValidator = (control: UntypedFormControl): Record<string, boolean> => {
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

  modalOkHandler = () => {
    Object.values(this.form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity({ onlySelf: true })
      }
    })
    if (this.form.valid) {
      const value = this.form.value
      this.submitLoading = true
      const phone = Number(value.phone)
      this.userService
        .setPhone({
          phone,
          code: value.code
        })
        .subscribe({
          next: () => {
            // 更新store
            this.store.dispatch(
              userInfoActions.setUserInfo({
                payload: {
                  phone
                }
              })
            )
            this.translate.get('editPhone').subscribe((message) => {
              this.translate.get('whatSuccess', { value: message }).subscribe((message) => {
                this.message.success(message)
                this.submitLoading = false
                this.visible = false
              })
            })
          },
          error: () => {
            this.submitLoading = false
          }
        })
    }
  }

  modalCancelHandler = () => {
    this.form.reset()
    clearInterval(this.timer)
    this.codeTime = 0
    this.phoneCode = ''
    this.visible = false
  }
}
