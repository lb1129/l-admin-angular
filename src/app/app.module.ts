import { NgModule, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import zh from '@angular/common/locales/zh'

import { NZ_I18N, zh_CN, en_US } from 'ng-zorro-antd/i18n'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Interceptor } from '@/app/http/interceptor'

import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { environment } from '@/environments/environment'

registerLocaleData(en)
registerLocaleData(zh)

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#1890ff'
  }
}

const HttpLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.LOCALE,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    NzMessageService,
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en-US':
            return en_US
          default:
            return zh_CN
        }
      },
      deps: [LOCALE_ID]
    },
    { provide: LOCALE_ID, useValue: environment.LOCALE },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
