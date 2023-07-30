import { createActionGroup, props, emptyProps } from '@ngrx/store'
import type { MenuDataItemType } from '@/app/types/menu'

export const menuActions = createActionGroup({
  source: 'Menu',
  events: {
    setMenu: props<{ payload: MenuDataItemType[] }>(),
    setMenuDone: emptyProps(),
    resetMenu: emptyProps()
  }
})
