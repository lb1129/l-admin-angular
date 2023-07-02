import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons'

import ProductDetailComponent from './product-detail.component'

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent
  let fixture: ComponentFixture<ProductDetailComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzIconModule.forRoot([ArrowLeftOutline])],
      providers: [provideRouter([]), provideHttpClient()]
    })
    fixture = TestBed.createComponent(ProductDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
