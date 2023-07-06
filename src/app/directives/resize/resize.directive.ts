import { Directive, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core'

export interface ResizeChangeRes {
  width: number
  height: number
}

@Directive({
  selector: '[appResize]',
  standalone: true
})
export class ResizeDirective implements OnDestroy {
  @Output() appResizeChange = new EventEmitter<ResizeChangeRes>()

  private ro: ResizeObserver

  constructor(private el: ElementRef) {
    this.ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      this.appResizeChange.emit({
        width,
        height
      })
    })
    this.ro.observe(this.el.nativeElement)
  }

  ngOnDestroy(): void {
    this.ro.unobserve(this.el.nativeElement)
  }
}
