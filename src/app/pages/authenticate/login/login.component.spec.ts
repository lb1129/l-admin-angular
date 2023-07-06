import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { UserOutline, LockOutline, GlobalOutline } from '@ant-design/icons-angular/icons'

import LoginComponent from './login.component'

import { TranslateModule } from '@ngx-translate/core'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NzIconModule.forRoot([UserOutline, LockOutline, GlobalOutline]),
        TranslateModule.forRoot()
      ],
      providers: [provideRouter([]), provideHttpClient()]
    })
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
