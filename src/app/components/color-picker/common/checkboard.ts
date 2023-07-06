import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-color-picker-checkboard',
  template: `<div class="vc-checkboard"></div>`,
  styles: [
    `
      .vc-checkboard {
        position: absolute;
        inset: 0;
        background-image: conic-gradient(
          rgb(0 0 0 / 6%) 0 25%,
          transparent 0 50%,
          rgb(0 0 0 / 6%) 0 75%,
          transparent 0
        );
        background-size: 8px 8px;
      }
    `
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerCheckboardComponent {}
