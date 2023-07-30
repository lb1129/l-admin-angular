import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { menu_get_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import type { MenuDataItemType } from '@/app/types/menu'

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  getMenu() {
    return this.httpClient.get<IResponse<MenuDataItemType[]>>(menu_get_api, {
      params: {
        type: 'PC'
      }
    })
  }
}
