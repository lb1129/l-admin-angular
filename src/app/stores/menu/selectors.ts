import { createFeatureSelector, createSelector } from '@ngrx/store'
import type { MenuDataItemType } from '@/app/types/menu'

const selectMenu = createFeatureSelector<{
  data: MenuDataItemType[]
  done: boolean
}>('menu')

export const menuSelectors = {
  menu: selectMenu,
  menuData: createSelector(selectMenu, (menu) => menu.data)
}
