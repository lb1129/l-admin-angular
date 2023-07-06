import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core'

@Component({
  selector: 'app-color-picker-saturation',
  template: `<div
    class="vc-saturation"
    [style]="{ background: getBgColor() }"
    #container
    (mousedown)="handleMouseDown()"
  >
    <div class="vc-saturation-white"></div>
    <div class="vc-saturation-black"></div>
    <div class="vc-saturation-pointer" [style]="{ top: getPointerTop(), left: getPointerLeft() }">
      <div class="vc-saturation-circle"></div>
    </div>
  </div>`,
  styles: [
    `
      .vc-saturation,
      .vc-saturation-white,
      .vc-saturation-black {
        cursor: pointer;
        position: absolute;
        inset: 0;
      }

      .vc-saturation-white {
        background: linear-gradient(to right, #fff, rgb(255 255 255 / 0%));
      }

      .vc-saturation-black {
        background: linear-gradient(to top, #000, rgb(0 0 0 / 0%));
      }

      .vc-saturation-pointer {
        cursor: pointer;
        position: absolute;
      }

      .vc-saturation-circle {
        cursor: head;
        width: 4px;
        height: 4px;
        box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%),
          0 0 1px 2px rgb(0 0 0 / 40%);
        border-radius: 50%;
        transform: translate(-2px, -2px);
      }
    `
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerSaturationComponent {
  @Input() appValue!: { h: number; s: number; v: number; a: number }

  @Output() appChange = new EventEmitter<{
    h: number
    s: number
    v: number
    a: number
  }>()

  @ViewChild('container') container!: ElementRef<HTMLDivElement>

  getBgColor = () => `hsl(${this.appValue.h}, 100%, 50%)`
  getPointerTop = () => -(this.appValue.v * 100) + 1 + 100 + '%'
  getPointerLeft = () => this.appValue.s * 100 + '%'

  clamp(value: number, min: number, max: number) {
    return min < max
      ? value < min
        ? min
        : value > max
        ? max
        : value
      : value < max
      ? max
      : value > min
      ? min
      : value
  }

  handleChange = (e: MouseEvent) => {
    e.preventDefault()
    if (!this.container.nativeElement) {
      return
    }
    const containerWidth = this.container.nativeElement.clientWidth
    const containerHeight = this.container.nativeElement.clientHeight

    const xOffset = this.container.nativeElement.getBoundingClientRect().left + window.pageXOffset
    const yOffset = this.container.nativeElement.getBoundingClientRect().top + window.pageYOffset
    const pageX = e.pageX
    const pageY = e.pageY
    const left = this.clamp(pageX - xOffset, 0, containerWidth)
    const top = this.clamp(pageY - yOffset, 0, containerHeight)
    const saturation = left / containerWidth
    const bright = this.clamp(-(top / containerHeight) + 1, 0, 1)

    this.appChange.emit({
      h: this.appValue.h,
      s: saturation,
      v: bright,
      a: this.appValue.a
    })
  }

  handleMouseDown = () => {
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  handleMouseUp = () => {
    this.unbindEventListeners()
  }
  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
}
