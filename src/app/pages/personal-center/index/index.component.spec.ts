import { ComponentFixture, TestBed } from '@angular/core/testing'

import IndexComponent from './index.component'

describe('IndexComponent', () => {
  let component: IndexComponent
  let fixture: ComponentFixture<IndexComponent>

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
