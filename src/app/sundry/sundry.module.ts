import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SundryRoutingModule } from './sundry-routing.module'
import { NotFoundComponent } from './not-found/not-found.component'
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component'

@NgModule({
  declarations: [NotFoundComponent, PrivacyPolicyComponent],
  imports: [CommonModule, SundryRoutingModule]
})
export class SundryModule {}
