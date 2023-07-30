import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { TranslateService } from '@ngx-translate/core'

@Component({
  imports: [CommonModule, RouterModule, NzMenuModule],
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  standalone: true
})
export default class IndexComponent {
  constructor(public translate: TranslateService) {}
}
