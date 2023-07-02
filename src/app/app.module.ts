import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'

import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'
import { NzMessageService } from 'ng-zorro-antd/message'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { Interceptor } from '@/app/http/interceptor'

registerLocaleData(zh)

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [
    NzMessageService,
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
