export interface OperateAuthType {
  add?: number
  delete?: number
  edit?: number
  detail?: number
}

export interface MenuDataItemType {
  // 菜单名称
  name: string
  // 菜单路径
  path: string
  // 菜单图标
  icon?: string
  // 菜单挂载的页面组件url（views目录内的视图组件）
  pageUrl?: string
  // 菜单是否隐藏
  hidden?: boolean
  // 菜单视图内的操作权限
  operateAuth?: OperateAuthType
  // 子级菜单
  children?: MenuDataItemType[]
}
