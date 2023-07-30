import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import { ReplaySubject, catchError, map, switchMap, from } from 'rxjs'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzI18nService } from 'ng-zorro-antd/i18n'
import { TokenLocalforage } from '@/app/storage/localforage'
import isAuthenticated from '@/app/auth/isAuthenticated'
import { RouteTools } from '@/app/utils/route-tools'
import { Config } from '@/app/config'
import { XMLParser } from 'fast-xml-parser'

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private router: Router,
    private routeTools: RouteTools,
    private nzI18nService: NzI18nService,
    private tokenLocalforage: TokenLocalforage,
    private config: Config
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.tokenLocalforage.get()).pipe(
      map((token) => {
        let url = req.url
        // api补全url
        if (/^\/?api\//i.test(url)) {
          url = `${this.config.http.baseURL}${url}`
        }
        return req.clone({
          url,
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': this.nzI18nService.getLocaleId()
          }
        })
      }),
      switchMap((newReq) => {
        return next.handle(newReq)
      }),
      // 响应处理
      map((event) => {
        // NOTE 默认行为就是使用接口返回的数据返回
        if (event instanceof HttpResponse) {
          return event.clone({ body: event.body })
        }
        return event
      }),
      // 错误处理
      catchError(async (error) => {
        const { route } = this.routeTools.getActiveRoute()
        if (error.status === 401) {
          if (route.snapshot.data && route.snapshot.data['needAuth'] === true) {
            await this.tokenLocalforage.clear()
            const subject = new ReplaySubject<boolean>(1)
            isAuthenticated.value = subject
            subject.next(false)
            this.router.navigate(['login'], { replaceUrl: true })
          }
        } else {
          let message = ''
          const contentType = error.headers.get('content-type')
          // NOTE 阿里云oss错误响应是application/xml
          if (contentType === 'application/xml') {
            const parser = new XMLParser()
            message = parser.parse(error.error).Error.Message
          } else if (contentType === 'application/json') {
            if (error.error.error) message = error.error.error.message
            else message = error.error.errMsg
          }
          this.message.error(message)
        }
        // 再往外抛 让外部的错误处理可执行
        throw error
      })
    )
  }
}
