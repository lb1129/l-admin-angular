import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ReplaySubject, switchMap, tap } from 'rxjs'
import { login_api, logout_api, isLogin_api, register_api, findPassword_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import isAuthenticated from '@/app/auth/isAuthenticated'
import { OtherService } from './other.service'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient, private otherService: OtherService) {}

  login(ops: { username: string; password: string }) {
    const subject = new ReplaySubject<boolean>(1)
    isAuthenticated.value = subject
    return this.otherService.rsaEncrypt(ops.password).pipe(
      switchMap((encrypt) => {
        return this.httpClient
          .post<IResponse<string>>(login_api, {
            username: ops.username,
            password: encrypt
          })
          .pipe(
            tap({
              next() {
                subject.next(true)
              },
              error() {
                subject.next(false)
              }
            })
          )
      })
    )
  }

  logout() {
    const subject = new ReplaySubject<boolean>(1)
    isAuthenticated.value = subject
    return this.httpClient.get<IResponse<null>>(logout_api).pipe(
      tap({
        next() {
          subject.next(false)
        },
        error() {
          subject.next(true)
        }
      })
    )
  }

  isLogin() {
    const subject = new ReplaySubject<boolean>(1)
    isAuthenticated.value = subject
    return this.httpClient.get<IResponse<boolean>>(isLogin_api).pipe(
      tap({
        next() {
          subject.next(true)
        },
        error() {
          subject.next(false)
        }
      })
    )
  }

  register(ops: { username: string; password: string; phone: number; code: string }) {
    return this.otherService.rsaEncrypt(ops.password).pipe(
      switchMap((encryptValue) => {
        return this.httpClient.post<IResponse<string>>(register_api, {
          username: ops.username,
          phone: ops.phone,
          code: ops.code,
          password: encryptValue
        })
      })
    )
  }

  findPassword(ops: { password: string; phone: number; code: string }) {
    return this.otherService.rsaEncrypt(ops.password).pipe(
      switchMap((encryptValue) => {
        return this.httpClient.post<IResponse<string>>(findPassword_api, {
          phone: ops.phone,
          code: ops.code,
          password: encryptValue
        })
      })
    )
  }
}
