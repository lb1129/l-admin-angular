import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PageLoadingComponent } from './page-loading.component'

import { TranslateModule } from '@ngx-translate/core'

describe('PageLoadingComponent', () => {
  let component: PageLoadingComponent
  let fixture: ComponentFixture<PageLoadingComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: []
    })
    fixture = TestBed.createComponent(PageLoadingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
