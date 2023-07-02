import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http'

import { NzMessageModule } from 'ng-zorro-antd/message'
import ProductListComponent from './product-list.component'

describe('ProductListComponent', () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzMessageModule],
      providers: [provideRouter([]), provideAnimations(), provideHttpClient()]
    })
    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
