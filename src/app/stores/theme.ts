import { Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ThemeStore {
  data = new ReplaySubject<string>(1)
  constructor() {
    this.data.next('#1890ff')
  }
  setData(newData: string) {
    this.data.next(newData)
  }
}
