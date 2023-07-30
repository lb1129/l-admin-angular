import { createReducer, on } from '@ngrx/store'
import { menuActions } from './actions'
import type { MenuDataItemType } from '@/app/types/menu'

const initialState: {
  data: MenuDataItemType[]
  done: boolean
} = {
  data: [],
  done: false
}

export default createReducer(
  initialState,
  on(menuActions.setMenu, (state, { payload }) => ({ ...state, data: payload })),
  on(menuActions.setMenuDone, (state) => ({ ...state, done: true })),
  on(menuActions.resetMenu, () => initialState)
)
