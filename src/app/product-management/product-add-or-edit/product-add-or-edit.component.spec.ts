import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProductAddOrEditComponent } from './product-add-or-edit.component'

describe('ProductAddOrEditComponent', () => {
  let component: ProductAddOrEditComponent
  let fixture: ComponentFixture<ProductAddOrEditComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddOrEditComponent]
    })
    fixture = TestBed.createComponent(ProductAddOrEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
