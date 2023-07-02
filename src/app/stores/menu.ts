import { Injectable } from '@angular/core'
import type { MenuDataItemType } from '@/app/pages/personal-center/types'

@Injectable({
  providedIn: 'root'
})
export class MenuStore {
  data: MenuDataItemType[] = []

  setData(newData: MenuDataItemType[]) {
    this.data = newData
  }
}
