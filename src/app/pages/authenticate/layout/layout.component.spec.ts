import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import LayoutComponent from './layout.component'

import { TranslateModule } from '@ngx-translate/core'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { GlobalOutline } from '@ant-design/icons-angular/icons'

describe('LayoutComponent', () => {
  let component: LayoutComponent
  let fixture: ComponentFixture<LayoutComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NzIconModule.forRoot([GlobalOutline])],
      providers: [provideRouter([])]
    })
    fixture = TestBed.createComponent(LayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
