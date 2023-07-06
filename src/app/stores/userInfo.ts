import { Injectable } from '@angular/core'
import type { UserInfoType } from '@/app/pages/personal-center/types'
import { ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserInfoStore {
  data = new ReplaySubject<UserInfoType>(1)

  setData(newData: UserInfoType) {
    this.data.next(newData)
  }
}
