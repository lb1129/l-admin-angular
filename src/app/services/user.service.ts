import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { userInfo_get_api, userInfo_edit_api, userInfo_set_phone_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import type { UserType } from '@/app/types/user'

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserInfo() {
    return this.httpClient.get<IResponse<UserType>>(userInfo_get_api)
  }

  editUserInfo(userInfo: { nickname?: string; profile?: string; avatar?: string }) {
    return this.httpClient.post<IResponse<boolean>>(userInfo_edit_api, userInfo)
  }

  setPhone(ops: { phone: number; code: string }) {
    return this.httpClient.post<IResponse<boolean>>(userInfo_set_phone_api, {
      phone: ops.phone,
      code: ops.code
    })
  }
}
