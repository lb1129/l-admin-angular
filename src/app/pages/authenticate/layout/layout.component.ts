import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { environment } from '@/environments/environment'
import { NzDividerModule } from 'ng-zorro-antd/divider'

@Component({
  imports: [NzDividerModule, RouterModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  standalone: true
})
export default class LayoutComponent {
  systemName = environment.SYSTEM_NAME
}
