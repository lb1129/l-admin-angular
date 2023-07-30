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
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from '@/app/services/auth.service'
import { UserService } from '@/app/services/user.service'
import { MenuService } from '@/app/services/menu.service'
import { TokenLocalforage } from '@/app/storage/localforage'
import LayoutComponent from '../layout/layout.component'
import { Store } from '@ngrx/store'
import { userInfoActions } from '@/app/stores/user-info/actions'
import { menuActions } from '@/app/stores/menu/actions'

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
    private router: Router,
    private fb: UntypedFormBuilder,
    private notification: NzNotificationService,
    public translate: TranslateService,
    private authService: AuthService,
    private userService: UserService,
    private menuService: MenuService,
    private store: Store,
    public tokenLocalforage: TokenLocalforage
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitHandler() {
    if (this.form.valid) {
      this.loading = true
      const value = this.form.value
      this.authService.login(value).subscribe({
        next: async (res) => {
          await this.tokenLocalforage.set(res.data)
          // 获取菜单
          this.menuService.getMenu().subscribe((menuRes) => {
            // 更新 menu store
            this.store.dispatch(menuActions.setMenu({ payload: menuRes.data }))
            // 获取用户信息
            this.userService.getUserInfo().subscribe((userInfoRes) => {
              // 更新 userInfo store
              this.store.dispatch(userInfoActions.setUserInfo({ payload: userInfoRes.data }))
              // 跳转首页
              this.router.navigate([''], { replaceUrl: true })
              setTimeout(() => {
                // 欢迎提示
                this.translate.get('welcome').subscribe((message) => {
                  this.notification.success(message, userInfoRes.data.nickname)
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
