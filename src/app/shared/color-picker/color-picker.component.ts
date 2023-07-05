import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { CommonModule } from '@angular/common'
import tinycolor, {
  type ColorInputWithoutInstance,
  type ColorFormats,
  type Instance
} from 'tinycolor2'
import { ColorPickerEditableInputComponent } from './common/editable-input'
import { ColorPickerSaturationComponent } from './common/saturation'
import { ColorPickerHueComponent } from './common/hue'
import { ColorPickerAlphaComponent } from './common/alpha'
import { ColorPickerCheckboardComponent } from './common/checkboard'

export interface ColorType {
  hex: string
  hsl: ColorFormats.HSLA
  hsv: ColorFormats.HSVA
  rgba: ColorFormats.RGBA
}

@Component({
  imports: [
    CommonModule,
    ColorPickerEditableInputComponent,
    ColorPickerSaturationComponent,
    ColorPickerHueComponent,
    ColorPickerAlphaComponent,
    ColorPickerCheckboardComponent
  ],
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.less'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent implements OnChanges {
  @Input() appValue!: ColorInputWithoutInstance
  @Input() appPresets!: ColorInputWithoutInstance[]
  @Input() appDisableAlpha = false
  @Input() appDisableFields = false

  @Output() appChange = new EventEmitter<ColorType>()

  toInnerValue(data: ColorInputWithoutInstance): ColorType {
    let tinycolorInstance: Instance

    if (typeof data === 'string') {
      // Hex, 8-digit (RGBA) Hex 例如：#000 000 #369C 369C #f0f0f6 f0f0f6 #f0f0f688 f0f0f688
      // RGB, RGBA 例如: rgb (255, 0, 0) rgb 255 0 0 rgba (255, 0, 0, .5)
      // HSL, HSLA 例如: hsl(0, 100%, 50%) hsla(0, 100%, 50%, .5) hsl(0, 100%, 50%) hsl 0 1.0 0.5
      // HSV, HSVA 例如: hsv(0, 100%, 100%) hsva(0, 100%, 100%, .5) hsv (0 100% 100%) hsv 0 1 1
      // Named 例如: red blanchedalmond darkblue
      tinycolorInstance = tinycolor(data)
    } else {
      // RGB, RGBA 例如: { r: 255, g: 0, b: 0 } { r: 255, g: 0, b: 0, a: 0.5 }
      // HSL, HSLA 例如: { h: 0, s: 1, l: .5 } { h: 0, s: 1, l: .5, a: 0.5 }
      // HSV, HSVA 例如: { h: 0, s: 100, v: 100 } { h: 0, s: 100, v: 100, a: 0.5 }
      tinycolorInstance = tinycolor(data)
    }

    const hex = tinycolorInstance.toHex()
    const hsl = tinycolorInstance.toHsl()
    const hsv = tinycolorInstance.toHsv()
    const rgba = tinycolorInstance.toRgb()

    return {
      hex,
      hsl,
      hsv,
      rgba
    }
  }
  innerValue = this.toInnerValue(this.appValue)

  ngOnChanges() {
    this.innerValue = this.toInnerValue(this.appValue)
  }

  getActiveColor = () => {
    const rgba = this.innerValue.rgba
    return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
  }

  getInnerRgbaPresets = () =>
    this.appPresets ? this.appPresets.map((preset) => tinycolor(preset).toRgbString()) : []

  changeHandle(color: ColorInputWithoutInstance) {
    this.innerValue = this.toInnerValue(color)
    this.appChange.emit(this.innerValue)
  }

  hexChangeHandle(hex: string | number) {
    if (typeof hex === 'string' && hex.length >= 6) {
      if (tinycolor(hex).isValid()) {
        this.changeHandle(hex)
      }
    }
  }

  rgbaSingleChangeHandle(val: string | number, flag: 'r' | 'g' | 'b' | 'a') {
    const { r, g, b, a } = this.innerValue.rgba
    const res: ColorFormats.RGBA = {
      r,
      g,
      b,
      a
    }
    res[flag] = val as number
    this.changeHandle(res)
  }
}
