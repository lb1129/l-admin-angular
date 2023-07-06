import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router'

import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'

import { NZ_I18N, zh_CN, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n'
import { zhCN } from 'date-fns/locale'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Interceptor } from '@/app/http/interceptor'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { CustomReuseStrategy } from '@/app/utils/custom-reuse-strategy'

registerLocaleData(zh)

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#1890ff'
  }
}

const HttpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, 'assets/i18n/')
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'zh-CN',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    NzMessageService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    {
      provide: NZ_I18N,
      useValue: zh_CN
    },
    { provide: NZ_DATE_LOCALE, useValue: zhCN },
    { provide: LOCALE_ID, useValue: 'zh-CN' },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
