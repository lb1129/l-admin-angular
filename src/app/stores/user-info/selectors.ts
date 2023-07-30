import { createFeatureSelector, createSelector } from '@ngrx/store'
import type { UserType } from '@/app/types/user'

const selectUserInfo = createFeatureSelector<UserType>('userInfo')

export const userInfoSelectors = {
  userInfo: selectUserInfo,
  nickname: createSelector(selectUserInfo, (userInfo) => {
    return userInfo.nickname
  }),
  avatar: createSelector(selectUserInfo, (userInfo) => {
    return userInfo.avatar
  })
}
