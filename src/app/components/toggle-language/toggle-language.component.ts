import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n'
import { TranslateService } from '@ngx-translate/core'
import { enUS, zhCN } from 'date-fns/locale'
import { LocaleLocalforage } from '@/app/storage/localforage'

@Component({
  imports: [NzDropDownModule, NzIconModule, NzMenuModule],
  selector: 'app-toggle-language',
  templateUrl: './toggle-language.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleLanguageComponent implements OnInit {
  @Input() appClass!: string

  constructor(
    public translate: TranslateService,
    private nzI18nService: NzI18nService,
    private localeLocalforage: LocaleLocalforage
  ) {}

  async ngOnInit() {
    const locale = await this.localeLocalforage.get()
    if (locale && this.translate.defaultLang !== locale) this.setLocale(locale)
  }

  setLocale(locale: string) {
    this.translate.setDefaultLang(locale)
    this.nzI18nService.setLocale(locale === 'en-US' ? en_US : zh_CN)
    this.nzI18nService.setDateLocale(locale === 'en-US' ? enUS : zhCN)
  }

  changeHandler(locale: string) {
    this.setLocale(locale)
    this.localeLocalforage.set(locale)
  }
}
