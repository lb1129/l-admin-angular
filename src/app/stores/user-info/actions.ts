import { createActionGroup, props, emptyProps } from '@ngrx/store'
import type { UserType } from '@/app/types/user'

export const userInfoActions = createActionGroup({
  source: 'UserInfo',
  events: {
    setUserInfo: props<{ payload: Partial<UserType> }>(),
    resetUserInfo: emptyProps()
  }
})
