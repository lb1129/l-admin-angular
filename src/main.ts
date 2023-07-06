import '@angular/localize'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from '@/app/app.module'
import './mock/index'

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
