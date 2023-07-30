import { Injectable } from '@angular/core'
import { HttpClient, HttpRequest, HttpEventType, HttpResponseBase } from '@angular/common/http'
import { Observable, switchMap } from 'rxjs'
import { upload_get_params_api } from '@/app/http/api'
import type { IResponse } from '@/app/http/types'
import { Config } from '@/app/config'

interface Params {
  'Cache-Control': string
  'Content-Disposition': string
  OSSAccessKeyId: string
  Signature: string
  host: string
  id: string
  key: string
  policy: string
  success_action_status: number
  'x-oss-security-token': string
  callback: string
}

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  upload(file: File, onProgress?: (percent: number) => void) {
    return this.httpClient
      .get<IResponse<Params>>(upload_get_params_api, {
        params: {
          ext: file.name.slice(file.name.lastIndexOf('.'))
        }
      })
      .pipe(
        switchMap((res) => {
          const params = res.data
          const formData = new FormData()
          Object.keys(params).forEach((key) => {
            const val = params[key as keyof Params]
            formData.append(key, val as string)
          })
          formData.append('file', file)
          const req = new HttpRequest('POST', this.config.http.uploadURL, formData, {
            reportProgress: true
          })
          return new Observable<string>((sub) => {
            this.httpClient.request(req).subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                if (event.total) {
                  const percent = Math.round((event.loaded * 100) / event.total)
                  onProgress && onProgress(percent)
                }
              } else if (event instanceof HttpResponseBase) {
                if (event.ok) sub.next(`${this.config.http.downloadURL}/${params.key}`)
                else sub.error(event)
              }
            })
          })
        })
      )
  }
}
