import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { environment } from '@/environments/environment'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { TranslateService } from '@ngx-translate/core'
import { ToggleLanguageComponent } from '@/app/components/toggle-language/toggle-language.component'

@Component({
  imports: [RouterModule, CommonModule, NzDividerModule, ToggleLanguageComponent],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  standalone: true
})
export default class LayoutComponent {
  systemName = environment.SYSTEM_NAME

  constructor(public translate: TranslateService) {}
}
