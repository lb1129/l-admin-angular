import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'

import { AuthenticateModule } from './pages/authenticate/authenticate.module'
import { IndexModule } from './pages/index/index.module'
import { SundryModule } from './pages/sundry/sundry.module'

registerLocaleData(zh)

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthenticateModule, IndexModule, SundryModule],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {}
