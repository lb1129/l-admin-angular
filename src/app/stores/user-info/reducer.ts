import { createReducer, on } from '@ngrx/store'
import { userInfoActions } from './actions'
import type { UserType } from '@/app/types/user'

const initialState: UserType = {
  _id: '',
  username: '',
  nickname: '',
  phone: null,
  avatar: '',
  profile: ''
}

export default createReducer(
  initialState,
  on(userInfoActions.setUserInfo, (state, { payload }) => ({ ...state, ...payload })),
  on(userInfoActions.resetUserInfo, () => initialState)
)
