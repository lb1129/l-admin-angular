import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import RegisterComponent from './register.component'

import { TranslateModule } from '@ngx-translate/core'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { GlobalOutline } from '@ant-design/icons-angular/icons'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NzIconModule.forRoot([GlobalOutline])],
      providers: [provideRouter([])]
    })
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
