import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons'

import ProductAddOrEditComponent from './product-add-or-edit.component'

describe('ProductAddOrEditComponent', () => {
  let component: ProductAddOrEditComponent
  let fixture: ComponentFixture<ProductAddOrEditComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzIconModule.forRoot([ArrowLeftOutline])],
      providers: []
    })
    fixture = TestBed.createComponent(ProductAddOrEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
