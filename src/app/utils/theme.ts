import { Injectable } from '@angular/core'
import { ThemeLocalforage } from '@/app/storage/localforage'
import { NzConfigService } from 'ng-zorro-antd/core/config'
import { Config } from '@/app/config'
import { from, map } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class Theme {
  constructor(
    private themeLocalforage: ThemeLocalforage,
    private nzConfigService: NzConfigService,
    private config: Config
  ) {}

  set(color: string) {
    this.nzConfigService.set('theme', {
      primaryColor: color
    })
    this.themeLocalforage.set(color)
  }

  get() {
    return from(this.themeLocalforage.get()).pipe(
      map((val) => {
        if (val) return val
        return this.config.themeColor
      })
    )
  }

  init() {
    this.get().subscribe((color) => {
      this.nzConfigService.set('theme', {
        primaryColor: color
      })
    })
  }
}
