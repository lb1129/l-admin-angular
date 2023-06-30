import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IndexRoutingModule } from './index-routing.module'
import { IndexComponent } from './index/index.component'
import { HomeComponent } from './home/home.component'

import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzIconModule } from 'ng-zorro-antd/icon'

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { PositionMapModule } from '../../shared/position-map/position-map.module'

@NgModule({
  declarations: [IndexComponent, HomeComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzAvatarModule,
    NzToolTipModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    PositionMapModule
  ]
})
export class IndexModule {}
