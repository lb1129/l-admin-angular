import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

import { AuthenticateRoutingModule } from './authenticate-routing.module'
import { FindPasswordComponent } from './find-password/find-password.component'
import { LayoutComponent } from './layout/layout.component'

import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzButtonModule } from 'ng-zorro-antd/button'

@NgModule({
  declarations: [LoginComponent, RegisterComponent, FindPasswordComponent, LayoutComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    AuthenticateRoutingModule
  ]
})
export class AuthenticateModule {}
