import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { environment } from '@/environments/environment'
import queryString from 'query-string'
import { catchError, map, switchMap } from 'rxjs/operators'
import { NzMessageService } from 'ng-zorro-antd/message'
import { tokenLocalforage } from '@/app/storage/localforage'
import { Observable, delay } from 'rxjs'

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private message: NzMessageService) {}

  // 支持异步处理req
  handleReq(req: HttpRequest<any>) {
    return new Observable<HttpRequest<any>>((observer) => {
      ;(async () => {
        const token = await tokenLocalforage.get()
        const newReq = req.clone({
          url: environment.SERVER_IS_MOCK
            ? queryString.stringifyUrl({
                url: req.url,
                query: {
                  authorization: token
                }
              })
            : req.url,
          setHeaders: {
            Authorization: token
          }
        })
        observer.next(newReq)
      })()
    })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // TODO status 500 retry
    return this.handleReq(req).pipe(
      switchMap((newReq) => {
        return next.handle(newReq)
      }),
      // 处于 mock server 环境
      delay(200),
      map((event) => {
        // 响应处理
        if (event instanceof HttpResponse) {
          // 处于 mock server 环境
          if (environment.SERVER_IS_MOCK) {
            if (event.body.status >= 200 && event.body.status < 300) {
              return event.clone({ body: event.body.data })
            } else {
              // 401 未登录
              if (event.body.status === 401) {
                // TODO
              }
              // 抛出错误 走catchError
              throw event.clone({ body: event.body.data })
            }
          }
        }
        return event
      }),
      // 错误处理
      catchError((error) => {
        if (error.status === 401) {
          // TODO
        } else {
          this.message.error(error.body ? error.body.message : error.message)
        }
        // 再往外抛 让外部的错误处理可执行
        throw error
      })
    )
  }
}
