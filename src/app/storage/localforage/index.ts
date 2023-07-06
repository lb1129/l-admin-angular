import localforage from 'localforage'
import { token, themeColor, locale } from './keys'
import { environment } from '@/environments/environment'
import { Injectable } from '@angular/core'

localforage.config({
  name: environment.SYSTEM_NAME,
  storeName: 'store'
})

@Injectable({
  providedIn: 'root'
})
export class TokenLocalforage {
  async get() {
    const value = await localforage.getItem<string>(token)
    return value ?? ''
  }
  async set(value: string) {
    return localforage.setItem(token, value)
  }
  async clear() {
    return localforage.removeItem(token)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ThemeLocalforage {
  async get() {
    const value = await localforage.getItem<string>(themeColor)
    return value ?? ''
  }
  async set(value: string) {
    return localforage.setItem(themeColor, value)
  }
  async clear() {
    return localforage.removeItem(themeColor)
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocaleLocalforage {
  async get() {
    const value = await localforage.getItem<string>(locale)
    return value ?? ''
  }
  async set(value: string) {
    return localforage.setItem(locale, value)
  }
  async clear() {
    return localforage.removeItem(locale)
  }
}
