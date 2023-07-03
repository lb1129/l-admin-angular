import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Router } from '@angular/router'

import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal'
import { NzMessageService } from 'ng-zorro-antd/message'

import { UserInfoStore } from '@/app/stores/userInfo'

import { AuthenticateService } from '@/app/pages/authenticate/services'
import { tokenLocalforage } from '@/app/storage/localforage'

import { environment } from '@/environments/environment'

@Component({
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzAvatarModule,
    NzToolTipModule,
    NzIconModule,
    NzModalModule
  ],
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  standalone: true
})
export default class IndexComponent {
  constructor(
    public userInfoStore: UserInfoStore,
    private modal: NzModalService,
    private message: NzMessageService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) {}
  isCollapsed = false
  logoSvg = '../../../assets/image/logo.svg'
  systemName = environment.SYSTEM_NAME

  logout() {
    this.modal.confirm({
      nzTitle: '提示',
      nzContent: '确定注销登录吗？',
      nzClosable: false,
      nzOnOk: () => {
        const messageRef = this.message.loading('正在注销，请稍等 ...', {
          nzDuration: 0
        })
        this.authenticateService.logout().subscribe({
          next: () => {
            tokenLocalforage.clear()
            this.message.remove(messageRef.messageId)
            this.router.navigate(['login'], { replaceUrl: true })
          },
          error: () => {
            this.message.remove(messageRef.messageId)
          }
        })
      }
    })
  }
}
