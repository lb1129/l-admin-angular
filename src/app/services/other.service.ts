import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import JSEncrypt from 'jsencrypt'
import { of, switchMap } from 'rxjs'
import { rsa_public_key_api, sendCode_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'

@Injectable({ providedIn: 'root' })
export class OtherService {
  constructor(private http: HttpClient) {}

  // rsa加密
  rsaEncrypt(value: string) {
    return this.http.get<IResponse<string>>(rsa_public_key_api).pipe(
      switchMap((res) => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(res.data)
        return of(encrypt.encrypt(value))
      })
    )
  }

  // NOTE 短信服务暂未接入运营商 先把code返回到前端
  sendCode(phone: number) {
    return this.http.post<IResponse<string>>(sendCode_api, { phone })
  }
}
