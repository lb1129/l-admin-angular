import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { menu_api, userInfo_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import type { MenuDataItemType, UserInfoType } from './types'

@Injectable({
  providedIn: 'root'
})
export class PersonalCenterService {
  constructor(private http: HttpClient) {}

  getMenu() {
    return this.http.get<IResponse<MenuDataItemType[]>>(menu_api)
  }

  getUserInfo() {
    return this.http.get<IResponse<UserInfoType>>(userInfo_api)
  }
}
