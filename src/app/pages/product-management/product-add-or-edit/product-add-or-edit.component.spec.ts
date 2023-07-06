import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { ArrowLeftOutline } from '@ant-design/icons-angular/icons'

import ProductAddOrEditComponent from './product-add-or-edit.component'
import { TranslateModule } from '@ngx-translate/core'

describe('ProductAddOrEditComponent', () => {
  let component: ProductAddOrEditComponent
  let fixture: ComponentFixture<ProductAddOrEditComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NzIconModule.forRoot([ArrowLeftOutline]),
        NzMessageModule,
        TranslateModule.forRoot()
      ],
      providers: [provideRouter([]), provideHttpClient()]
    })
    fixture = TestBed.createComponent(ProductAddOrEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
