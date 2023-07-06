import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appHost]',
  standalone: true
})
export class AppHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
