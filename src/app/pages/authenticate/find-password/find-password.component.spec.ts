import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'

import FindPasswordComponent from './find-password.component'

describe('FindPasswordComponent', () => {
  let component: FindPasswordComponent
  let fixture: ComponentFixture<FindPasswordComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
    })
    fixture = TestBed.createComponent(FindPasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
