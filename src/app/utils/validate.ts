import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class Validate {
  constructor() {}

  isPhone(phone: string) {
    return /^1[3456789]\d{9}$/.test(phone)
  }

  isPassword(password: string) {
    return /^[a-zA-Z0-9]{7,10}$/.test(password)
  }

  isNoValue(value: unknown) {
    if (value === null) return true
    if (value === undefined) return true
    if (typeof value === 'string' && !value) return true
    return false
  }
}
