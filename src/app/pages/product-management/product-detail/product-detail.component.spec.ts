import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons'

import ProductDetailComponent from './product-detail.component'

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent
  let fixture: ComponentFixture<ProductDetailComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzIconModule.forRoot([ArrowLeftOutline])],
      providers: []
    })
    fixture = TestBed.createComponent(ProductDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
