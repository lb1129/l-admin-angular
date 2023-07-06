import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import FindPasswordComponent from './find-password.component'

import { TranslateModule } from '@ngx-translate/core'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { GlobalOutline } from '@ant-design/icons-angular/icons'

describe('FindPasswordComponent', () => {
  let component: FindPasswordComponent
  let fixture: ComponentFixture<FindPasswordComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NzIconModule.forRoot([GlobalOutline])],
      providers: [provideRouter([])]
    })
    fixture = TestBed.createComponent(FindPasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
