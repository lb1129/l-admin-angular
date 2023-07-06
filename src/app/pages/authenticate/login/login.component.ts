import { Component } from '@angular/core'
import { RouterModule, Router } from '@angular/router'
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
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification'
import LayoutComponent from '../layout/layout.component'

import { AuthenticateService } from '../services'
import { PersonalCenterService } from '@/app/pages/personal-center/service'
import { MenuStore } from '@/app/stores/menu'
import { UserInfoStore } from '@/app/stores/userInfo'

import { TokenLocalforage } from '@/app/storage/localforage'
import { TranslateService } from '@ngx-translate/core'

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  standalone: true
})
export default class LoginComponent {
  form!: UntypedFormGroup
  loading = false

  constructor(
    private fb: UntypedFormBuilder,
    private authenticateService: AuthenticateService,
    private personalCenterService: PersonalCenterService,
    private router: Router,
    private notification: NzNotificationService,
    private menuStore: MenuStore,
    private userInfoStore: UserInfoStore,
    public translate: TranslateService,
    public tokenLocalforage: TokenLocalforage
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitHandler() {
    if (this.form.valid) {
      this.loading = true
      const value = this.form.value
      this.authenticateService.login(value).subscribe({
        next: async (res) => {
          await this.tokenLocalforage.set(res.data)
          // 获取菜单
          this.personalCenterService.getMenu().subscribe((menuRes) => {
            // 更新 menu store
            this.menuStore.setData(menuRes.data)
            // 获取用户信息
            this.personalCenterService.getUserInfo().subscribe((userInfoRes) => {
              // 更新 userInfo store
              this.userInfoStore.setData(userInfoRes.data)
              // 跳转首页
              this.router.navigate([''], { replaceUrl: true })
              setTimeout(() => {
                // 欢迎提示
                this.translate.get('welcome').subscribe((message) => {
                  this.notification.success(message, userInfoRes.data.userName)
                })
              }, 200)
              this.loading = false
            })
          })
        },
        error: () => {
          this.loading = false
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
