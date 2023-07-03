import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { login_api, logout_api, isLogin_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import isAuthenticated from '@/app/auth/isAuthenticated'
import { ReplaySubject, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  login(ops: { userName: string; password: string }) {
    const subject = new ReplaySubject<boolean>(1)
    isAuthenticated.value = subject
    return this.http.post<IResponse<string>>(login_api, ops).pipe(
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

  logout() {
    const subject = new ReplaySubject<boolean>(1)
    isAuthenticated.value = subject
    return this.http.post<IResponse<null>>(logout_api, {}).pipe(
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
    return this.http.get<IResponse<boolean>>(isLogin_api).pipe(
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
}
