import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { UserOutline, DashboardOutline, ShopOutline } from '@ant-design/icons-angular/icons'

import IndexComponent from './index.component'

describe('IndexComponent', () => {
  let component: IndexComponent
  let fixture: ComponentFixture<IndexComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NzIconModule.forRoot([UserOutline, DashboardOutline, ShopOutline]),
        NzMessageModule
      ],
      providers: [provideRouter([]), provideAnimations(), provideHttpClient()]
    })
    fixture = TestBed.createComponent(IndexComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
