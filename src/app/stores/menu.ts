import { Injectable } from '@angular/core'
import type { MenuDataItemType } from '@/app/pages/personal-center/types'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MenuStore {
  data = new ReplaySubject<MenuDataItemType[]>(1)

  setData(newData: MenuDataItemType[]) {
    this.data.next(newData)
  }
}
