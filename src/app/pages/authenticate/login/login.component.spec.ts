import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons'

import LoginComponent from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzIconModule.forRoot([UserOutline, LockOutline])],
      providers: [provideRouter([])]
    })
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
