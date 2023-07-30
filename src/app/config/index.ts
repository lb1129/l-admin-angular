import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class Config {
  constructor() {}

  http = {
    baseURL: 'https://api.leibo.group',
    uploadURL:
      'https://file-univjthjni-mp-d2e0b969-5400-4832-adeb-d0127579976e.oss-cn-zhangjiakou.aliyuncs.com',
    downloadURL: 'https://mp-d2e0b969-5400-4832-adeb-d0127579976e.cdn.bspapp.com',
    timeout: 60000
  }

  themeColor = '#52c41a'
}
