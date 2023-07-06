import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NzSpinModule } from 'ng-zorro-antd/spin'

@Component({
  imports: [NzSpinModule],
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoadingComponent {}
