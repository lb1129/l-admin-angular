import { Component, OnInit } from '@angular/core'

import { AuthenticateService } from '@/app/pages/authenticate/services'
import { PersonalCenterService } from '@/app/pages/personal-center/service'

import { MenuStore } from '@/app/stores/menu'
import { UserInfoStore } from '@/app/stores/userInfo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private authenticateService: AuthenticateService,
    private personalCenterService: PersonalCenterService,
    private menuStore: MenuStore,
    private userInfoStore: UserInfoStore
  ) {}
  ngOnInit() {
    this.authenticateService.isLogin().subscribe({
      next: () => {
        // 获取菜单
        this.personalCenterService.getMenu().subscribe((menuRes) => {
          // 更新 menu store
          this.menuStore.setData(menuRes.data)
          // 获取用户信息
          this.personalCenterService.getUserInfo().subscribe((userInfoRes) => {
            // 更新 userInfo store
            this.userInfoStore.setData(userInfoRes.data)
          })
        })
      }
    })
  }
}
