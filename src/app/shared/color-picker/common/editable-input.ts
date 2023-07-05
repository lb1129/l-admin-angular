import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core'

@Component({
  selector: 'app-color-picker-editable-input',
  template: `<div class="vc-editable-input">
    <input
      class="vc-input-input"
      [value]="innerValue"
      (keydown)="handleKeyDown($event)"
      (input)="inputHandle($event)"
      (blur)="blurHandle($event)"
      #inputRef
    />
    <span class="vc-input-label">{{ appLabel }}</span>
  </div>`,
  styles: [
    `
      .vc-editable-input {
        position: relative;
      }

      .vc-input-input {
        padding: 0;
        border: 0;
        outline: none;
      }
    `
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerEditableInputComponent implements OnChanges {
  @Input() appLabel!: string
  @Input() appValue!: string | number
  @Input() appType: 'text' | 'number' = 'number'
  @Input() appMax = 255
  @Input() appMin = 0
  @Input() appStep = 1
  @Input() appPrecision = 0

  @Output() appChange = new EventEmitter<string | number>()
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>

  innerValue = this.appValue

  ngOnChanges() {
    this.innerValue = this.appValue
  }

  inputHandle(e: Event) {
    const inputVal = (e.target as any).value
    if (this.appType === 'number') {
      // 错误值：不是数字 不在最大最小范围内 小数位数不符合 可一直输入  但是不触发事件
      const numberInputVal = Number(inputVal)
      if (isNaN(numberInputVal)) return
      if (this.appMax >= 0 && numberInputVal > this.appMax) return
      if (this.appMin >= 0 && numberInputVal < this.appMin) return
      if (this.appPrecision === 0 && inputVal.indexOf('.') > -1) return
      if (this.appPrecision > 0) {
        const reg1 = new RegExp(`^0(\\.[0-9]{0,${this.appPrecision}})?$`)
        const reg2 = new RegExp(`^[1-9]+(\\.[0-9]{0,${this.appPrecision}})?$`)
        if (!reg1.test(inputVal) && !reg2.test(inputVal)) return
      }
      this.innerValue = numberInputVal
      this.appChange.emit(numberInputVal)
    } else {
      this.appChange.emit(inputVal)
    }
  }

  // 失去焦点时 把值格式化还原
  blurHandle(e: Event) {
    const inputVal = (e.target as any).value
    if (this.appType === 'number') {
      const numberInputVal = Number(inputVal)
      // 不是数字 还原为当前合法值
      if (isNaN(numberInputVal)) {
        if (this.inputRef.nativeElement.value)
          this.inputRef.nativeElement.value = String(this.innerValue)
      } else if (this.appMax >= 0 && numberInputVal > this.appMax) {
        // 是数字 但是大于最大值 还原为最大值
        if (this.inputRef.nativeElement.value)
          this.inputRef.nativeElement.value = String(this.appMax)
        // 当前合法值不是最大值时 更新当前合法值并派发事件
        if (this.innerValue !== this.appMax) {
          this.innerValue = this.appMax
          this.appChange.emit(this.appMax)
        }
      } else if (this.appMin >= 0 && numberInputVal < this.appMin) {
        // 是数字 但是小于最小值 还原为最小值
        if (this.inputRef.nativeElement.value)
          this.inputRef.nativeElement.value = String(this.appMin)
        // 当前合法值不是最小值时 更新当前合法值并派发事件
        if (this.innerValue !== this.appMin) {
          this.innerValue = this.appMin
          this.appChange.emit(this.appMin)
        }
      } else if (this.appPrecision === 0 && inputVal.indexOf('.') > -1) {
        // 是数字 但是小数位不符合 还原为当前合法值
        if (this.inputRef.nativeElement.value)
          this.inputRef.nativeElement.value = String(this.innerValue)
      } else if (this.appPrecision > 0) {
        // 是数字 但是小数位不符合 还原为当前合法值
        const reg1 = new RegExp(`^0(\\.[0-9]{0,${this.appPrecision}})?$`)
        const reg2 = new RegExp(`^[1-9]+(\\.[0-9]{0,${this.appPrecision}})?$`)
        if (!reg1.test(inputVal) && !reg2.test(inputVal)) {
          if (this.inputRef.nativeElement.value)
            this.inputRef.nativeElement.value = String(this.innerValue)
        }
      }
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    if (this.appType === 'number') {
      const number = Number(this.innerValue)
      // Up
      if (e.keyCode === 38) {
        e.preventDefault()
        const upValue = number + this.appStep
        // 计算值小于等于最大值 且 当前合法值不等于最大值 时 更新当前合法值 派发事件
        if (this.appMax >= 0 && upValue <= this.appMax && this.innerValue !== this.appMax) {
          this.innerValue = upValue
          this.appChange.emit(upValue)
        }
      }
      // Down
      if (e.keyCode === 40) {
        e.preventDefault()
        const downValue = number - this.appStep
        // 计算值大于等于最小值 且 当前合法值不等于最小值 时 更新当前合法值 派发事件
        if (this.appMin >= 0 && downValue >= this.appMin && this.innerValue !== this.appMin) {
          this.innerValue = downValue
          this.appChange.emit(downValue)
        }
      }
    }
  }
}
