import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

import { AuthenticateRoutingModule } from './authenticate-routing.module'
import { FindPasswordComponent } from './find-password/find-password.component'

@NgModule({
  declarations: [LoginComponent, RegisterComponent, FindPasswordComponent],
  imports: [CommonModule, AuthenticateRoutingModule]
})
export class AuthenticateModule {}
