import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzImageModule } from 'ng-zorro-antd/image'
import { NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMessageService } from 'ng-zorro-antd/message'
import { FileService } from '@/app/services/file.service'
import { UserService } from '@/app/services/user.service'
import { Store } from '@ngrx/store'
import { userInfoSelectors } from '@/app/stores/user-info/selectors'
import { userInfoActions } from '@/app/stores/user-info/actions'

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule,
    NzImageModule,
    NzUploadModule,
    NzIconModule
  ],
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.less'],
  standalone: true
})
export default class BasicInfoComponent {
  form!: UntypedFormGroup
  avatar = this.store.select(userInfoSelectors.avatar)
  loading = false
  fileLoading = false

  constructor(
    private fb: UntypedFormBuilder,
    public translate: TranslateService,
    private fileService: FileService,
    private userService: UserService,
    private message: NzMessageService,
    private store: Store
  ) {
    this.form = this.fb.group({
      nickname: ['', Validators.required],
      profile: ['']
    })
    this.store.select(userInfoSelectors.userInfo).subscribe((userInfo) => {
      this.form.setValue({
        nickname: userInfo.nickname,
        profile: userInfo.profile
      })
    })
  }

  customRequestHandler = (ops: NzUploadXHRArgs) => {
    this.fileLoading = true
    return this.fileService
      .upload(ops.file as unknown as File, (percent) => {
        ops.onProgress && ops.onProgress({ percent: percent }, ops.file)
      })
      .subscribe({
        next: (url) => {
          ops.onSuccess && ops.onSuccess(url, ops.file, null)
          this.userService
            .editUserInfo({
              avatar: url
            })
            .subscribe({
              next: () => {
                // 更新store
                this.store.dispatch(
                  userInfoActions.setUserInfo({
                    payload: {
                      avatar: url
                    }
                  })
                )
                this.translate.get('editAvatar').subscribe((message) => {
                  this.translate.get('whatSuccess', { value: message }).subscribe((message) => {
                    this.message.success(message)
                    this.fileLoading = false
                  })
                })
              },
              error: () => {
                this.fileLoading = false
              }
            })
        },
        error: () => {
          ops.onError && ops.onError(false, ops.file)
          this.fileLoading = false
        }
      })
  }

  submitHandler() {
    if (this.form.valid) {
      this.loading = true
      const value: { nickname: string; profile: string } = this.form.value
      this.userService.editUserInfo(value).subscribe({
        next: () => {
          // 更新store
          this.store.dispatch(
            userInfoActions.setUserInfo({
              payload: value
            })
          )
          this.translate.get('updateBasicInfo').subscribe((message) => {
            this.translate.get('whatSuccess', { value: message }).subscribe((message) => {
              this.message.success(message)
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
