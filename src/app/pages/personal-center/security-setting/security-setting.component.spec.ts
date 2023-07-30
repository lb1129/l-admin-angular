import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SecuritySettingComponent } from './security-setting.component'

describe('SecuritySettingComponent', () => {
  let component: SecuritySettingComponent
  let fixture: ComponentFixture<SecuritySettingComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecuritySettingComponent]
    })
    fixture = TestBed.createComponent(SecuritySettingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
