import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PositionMapComponent } from './position-map.component'

@NgModule({
  declarations: [PositionMapComponent],
  exports: [PositionMapComponent],
  imports: [CommonModule]
})
export class PositionMapModule {}
