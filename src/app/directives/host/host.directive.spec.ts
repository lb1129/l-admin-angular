import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { HostDirective } from './host.directive'

@Component({
  imports: [HostDirective],
  template: `<ng-template appHost></ng-template>`,
  standalone: true
})
class TestComponent {}

describe('HostDirective', () => {
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
