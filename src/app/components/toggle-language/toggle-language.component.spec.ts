import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ToggleLanguageComponent } from './toggle-language.component'

import { TranslateModule } from '@ngx-translate/core'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { GlobalOutline } from '@ant-design/icons-angular/icons'

describe('ToggleLanguageComponent', () => {
  let component: ToggleLanguageComponent
  let fixture: ComponentFixture<ToggleLanguageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), NzIconModule.forRoot([GlobalOutline])],
      providers: []
    })
    fixture = TestBed.createComponent(ToggleLanguageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
