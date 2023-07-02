import { Injectable } from '@angular/core'
import type { UserInfoType } from '@/app/pages/personal-center/types'

@Injectable({
  providedIn: 'root'
})
export class UserInfoStore {
  data: UserInfoType = {
    userName: ''
  }

  setData(newData: UserInfoType) {
    this.data = newData
  }
}
