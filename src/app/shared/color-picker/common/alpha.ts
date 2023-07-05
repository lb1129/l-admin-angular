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
import { ColorPickerCheckboardComponent } from './checkboard'

@Component({
  imports: [ColorPickerCheckboardComponent],
  selector: 'app-color-picker-alpha',
  template: `<div class="vc-alpha">
    <div class="vc-alpha-checkboard-wrap">
      <app-color-picker-checkboard />
    </div>
    <div class="vc-alpha-gradient" [style]="{ background: getGradientColor() }"></div>
    <div class="vc-alpha-container" #container (mousedown)="handleMouseDown()">
      <div class="vc-alpha-pointer" [style]="{ left: getLeft() }">
        <div class="vc-alpha-picker"></div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .vc-alpha {
        position: absolute;
        inset: 0;
      }

      .vc-alpha-checkboard-wrap {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }

      .vc-alpha-gradient {
        position: absolute;
        inset: 0;
      }

      .vc-alpha-container {
        cursor: pointer;
        position: relative;
        z-index: 2;
        height: 100%;
        margin: 0 3px;
      }

      .vc-alpha-pointer {
        z-index: 2;
        position: absolute;
      }

      .vc-alpha-picker {
        cursor: pointer;
        width: 4px;
        border-radius: 1px;
        height: 8px;
        box-shadow: 0 0 2px rgb(0 0 0 / 60%);
        background: #fff;
        margin-top: 1px;
        transform: translateX(-2px);
      }
    `
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerAlphaComponent {
  @Input() appValue!: { r: number; g: number; b: number; a: number }
  @Output() appChange = new EventEmitter<{
    r: number
    g: number
    b: number
    a: number
  }>()
  @ViewChild('container') container!: ElementRef<HTMLDivElement>

  getLeft() {
    return this.appValue.a * 100 + '%'
  }

  getGradientColor() {
    const rgba = this.appValue
    const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
    return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
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

    let a
    if (left < 0) {
      a = 0
    } else if (left > containerWidth) {
      a = 1
    } else {
      a = Math.round((left * 100) / containerWidth) / 100
    }

    if (this.appValue.a !== a) {
      this.appChange.emit({
        r: this.appValue.r,
        g: this.appValue.g,
        b: this.appValue.b,
        a: a
      })
    }
  }

  handleMouseDown = () => {
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }
}
