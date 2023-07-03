import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class RouteSnapshotStore {
  data!: ActivatedRouteSnapshot

  setData(newData: ActivatedRouteSnapshot) {
    this.data = newData
  }
}
