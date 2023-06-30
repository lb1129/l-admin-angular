import { Component } from '@angular/core'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent {
  isCollapsed = false
  logoSvg = '../../../assets/logo.svg'
}
