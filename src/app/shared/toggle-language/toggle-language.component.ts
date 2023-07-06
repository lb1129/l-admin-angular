import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'

import { TranslateService } from '@ngx-translate/core'
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n'
import { enUS, zhCN } from 'date-fns/locale'

import { localeLocalforage } from '@/app/storage/localforage'

@Component({
  imports: [NzDropDownModule, NzIconModule, NzMenuModule],
  selector: 'app-toggle-language',
  template: `<span nz-dropdown [nzDropdownMenu]="menu" [class]="appClass">
      <span nz-icon nzType="global" style="font-size: 16px"></span>
    </span>
    <nz-dropdown-menu #menu>
      <ul nz-menu>
        <li
          nz-menu-item
          (click)="changeHandler('zh-CN')"
          [nzSelected]="translate.defaultLang === 'zh-CN'"
        >
          简体中文
        </li>
        <li
          nz-menu-item
          (click)="changeHandler('en-US')"
          [nzSelected]="translate.defaultLang === 'en-US'"
        >
          English
        </li>
      </ul>
    </nz-dropdown-menu>`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleLanguageComponent implements OnInit {
  @Input() appClass!: string

  constructor(public translate: TranslateService, private nzI18nService: NzI18nService) {}

  async ngOnInit() {
    const locale = await localeLocalforage.get()
    if (locale && this.translate.defaultLang !== locale) this.setLocale(locale)
  }

  setLocale(locale: string) {
    this.translate.setDefaultLang(locale)
    this.nzI18nService.setLocale(locale === 'en-US' ? en_US : zh_CN)
    this.nzI18nService.setDateLocale(locale === 'en-US' ? enUS : zhCN)
  }

  changeHandler(locale: string) {
    this.setLocale(locale)
    localeLocalforage.set(locale)
  }
}
