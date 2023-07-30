import { Component } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import { NzDividerModule } from 'ng-zorro-antd/divider'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { TranslateService } from '@ngx-translate/core'

@Component({
  imports: [CommonModule, NzDividerModule, NzButtonModule],
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less'],
  standalone: true
})
export default class NotFoundComponent {
  constructor(public translate: TranslateService, private location: Location) {}

  goBack() {
    this.location.back()
  }
}
