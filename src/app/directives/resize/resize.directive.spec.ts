import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { ResizeDirective } from './resize.directive'

@Component({
  imports: [ResizeDirective],
  template: `<div appResize></div>`,
  standalone: true
})
class TestComponent {}

describe('ResizeDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
