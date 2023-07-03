import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class RouteSnapshot {
  data!: ActivatedRouteSnapshot

  setData(newData: ActivatedRouteSnapshot) {
    this.data = newData
  }
}
