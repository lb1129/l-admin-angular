import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from '@/app/app.module'
import './mock/index'

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
// TODO 是否已登录跳转控制
// TODO 自定义指令 resize
// TODO 动态路由
// TODO 操作权限控制
// TODO 路由动画
// TODO 主题色在线切换
// TODO 多语言处理
