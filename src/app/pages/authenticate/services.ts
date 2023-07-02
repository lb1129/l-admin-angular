import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { login_api, logout_api, isLogin_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  login(ops: { userName: string; password: string }) {
    const p = this.http.post<IResponse<string>>(login_api, ops)
    return p
  }

  logout() {
    const p = this.http.post<IResponse<null>>(logout_api, {})
    return p
  }

  isLogin() {
    const p = this.http.get<IResponse<boolean>>(isLogin_api)
    return p
  }
}
