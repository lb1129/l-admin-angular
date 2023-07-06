import { Component, OnInit, ViewChild } from '@angular/core'
import { AppHostDirective } from '@/app/directives/host/host.directive'
import { PageLoadingComponent } from '@/app/components/page-loading/page-loading.component'

export const lazyLoad = (moduleName: string, componentName: string) => {
  // TODO fix ID 重复
  @Component({
    imports: [AppHostDirective, PageLoadingComponent],
    selector: 'app-lazy-load',
    template: `<ng-template appHost />`,
    standalone: true
  })
  class LazyLoadComponent implements OnInit {
    @ViewChild(AppHostDirective, { static: true }) appHost!: AppHostDirective

    ngOnInit(): void {
      this.appHost.viewContainerRef.createComponent(PageLoadingComponent)
      import(`../pages/${moduleName}/${componentName}/${componentName}.component`).then((res) => {
        this.appHost.viewContainerRef.clear()
        this.appHost.viewContainerRef.createComponent(res.default)
      })
    }
  }
  return LazyLoadComponent
}
