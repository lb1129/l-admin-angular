import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { IndexComponent } from './index/index.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {}
