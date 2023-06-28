import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { IndexModule } from '@/app/index/index.module'
import { AuthenticateModule } from '@/app/authenticate/authenticate.module'
import { SundryModule } from './sundry/sundry.module'
import { ProductManagementModule } from './product-management/product-management.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IndexModule,
    AuthenticateModule,
    ProductManagementModule,
    SundryModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
