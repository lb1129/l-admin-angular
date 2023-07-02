import { testData } from './keys'

export const testSeesion = {
  get() {
    let result: object
    const value = sessionStorage.getItem(testData)
    if (value) {
      try {
        result = JSON.parse(value)
      } catch (error) {
        result = {}
      }
    } else {
      result = {}
    }
    return result
  },
  set(value: object) {
    sessionStorage.setItem(testData, JSON.stringify(value))
  },
  clear() {
    sessionStorage.removeItem(testData)
  }
}
