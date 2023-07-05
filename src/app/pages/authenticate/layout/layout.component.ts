import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { environment } from '@/environments/environment'
import { NzDividerModule } from 'ng-zorro-antd/divider'

import { ToggleLanguageComponent } from '@/app/shared/toggle-language/toggle-language.component'

import { TranslateService } from '@ngx-translate/core'

@Component({
  imports: [NzDividerModule, RouterModule, CommonModule, ToggleLanguageComponent],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  standalone: true
})
export default class LayoutComponent {
  systemName = environment.SYSTEM_NAME

  constructor(public translate: TranslateService) {}
}
