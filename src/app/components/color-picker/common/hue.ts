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
  selector: 'app-color-picker-hue',
  template: `<div [class]="['vc-hue', 'vc-hue-horizontal']">
    <div
      class="vc-hue-container"
      aria-valuemin="0"
      aria-valuemax="360"
      #container
      (mousedown)="handleMouseDown()"
    >
      <div class="vc-hue-pointer" [style]="{ left: getPointerLeft() }" role="presentation">
        <div class="vc-hue-picker"></div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .vc-hue {
        position: absolute;
        inset: 0;
        border-radius: 2px;
      }

      .vc-hue-horizontal {
        background: linear-gradient(
          to right,
          #f00 0%,
          #ff0 17%,
          #0f0 33%,
          #0ff 50%,
          #00f 67%,
          #f0f 83%,
          #f00 100%
        );
      }

      .vc-hue-vertical {
        background: linear-gradient(
          to top,
          #f00 0%,
          #ff0 17%,
          #0f0 33%,
          #0ff 50%,
          #00f 67%,
          #f0f 83%,
          #f00 100%
        );
      }

      .vc-hue-container {
        cursor: pointer;
        margin: 0 2px;
        position: relative;
        height: 100%;
      }

      .vc-hue-pointer {
        z-index: 2;
        position: absolute;
      }

      .vc-hue-picker {
        cursor: pointer;
        margin-top: 1px;
        width: 4px;
        border-radius: 1px;
        height: 8px;
        box-shadow: 0 0 2px rgb(0 0 0 / 60%);
        background: #fff;
        transform: translateX(-2px);
      }
    `
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerHueComponent {
  @Input() appValue!: { h: number; s: number; l: number; a: number }

  @Output() appChange = new EventEmitter<{
    h: number
    s: number
    l: number
    a: number
  }>()

  @ViewChild('container') container!: ElementRef<HTMLDivElement>

  needKeep = false

  getPointerLeft() {
    // https://github.com/bgrins/TinyColor/issues/168
    if (this.needKeep) return '100%'
    return (this.appValue.h * 100) / 360 + '%'
  }

  handleChange = (e: MouseEvent) => {
    e.preventDefault()
    if (!this.container.nativeElement) {
      return
    }
    const containerWidth = this.container.nativeElement.clientWidth
    const xOffset = this.container.nativeElement.getBoundingClientRect().left + window.pageXOffset
    const pageX = e.pageX
    const left = pageX - xOffset

    let h
    let percent

    if (left < 0) {
      h = 0
    } else if (left > containerWidth) {
      h = 360
    } else {
      percent = (left * 100) / containerWidth
      h = (360 * percent) / 100
    }
    this.needKeep = h >= 360

    if (this.appValue.h !== h) {
      this.appChange.emit({
        h: h,
        s: this.appValue.s,
        l: this.appValue.l,
        a: this.appValue.a
      })
    }
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
