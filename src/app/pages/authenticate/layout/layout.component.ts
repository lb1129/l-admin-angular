import { Component } from '@angular/core'
import { environment } from '@/environments/environment'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent {
  systemName = environment.SYSTEM_NAME
}
