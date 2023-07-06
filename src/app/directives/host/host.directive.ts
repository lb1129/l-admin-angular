import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appHost]',
  standalone: true
})
export class HostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
