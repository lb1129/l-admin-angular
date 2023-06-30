import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PersonalCenterRoutingModule } from './personal-center-routing.module'
import { IndexComponent } from './index/index.component'

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, PersonalCenterRoutingModule]
})
export class PersonalCenterModule {}
