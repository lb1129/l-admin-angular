import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  NgZone,
  OnDestroy
} from '@angular/core'

export interface PositionInfo {
  province: string
  city: string
  address: string
  point: {
    lng: number
    lat: number
  }
}

@Component({
  selector: 'app-position-map',
  templateUrl: './position-map.component.html',
  styleUrls: ['./position-map.component.less']
})
export class PositionMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('wrapRef') wrapRef!: ElementRef<HTMLDivElement>
  @ViewChild('nodeRef') nodeRef!: ElementRef<HTMLDivElement>
  @ViewChild('suggestRef') suggestRef!: ElementRef<HTMLInputElement>
  @ViewChild('resultRef') resultRef!: ElementRef<HTMLDivElement>

  @Output() appChange = new EventEmitter<PositionInfo>()

  constructor(private zone: NgZone) {}

  suggestionRef!: HTMLElement | null
  ro!: ResizeObserver

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.ro = new ResizeObserver((entries) => {
        const height = `${entries[0].contentRect.height - 200}px`
        if (this.suggestionRef) this.suggestionRef.style.height = height
        this.resultRef.nativeElement.style.height = height
      })
      this.ro.observe(this.wrapRef.nativeElement)

      const localcity = new BMapGL.LocalCity()
      localcity.get((e) => {
        const map = new BMapGL.Map(this.nodeRef.nativeElement)
        const point = new BMapGL.Point(e.center.lng, e.center.lat)
        map.centerAndZoom(point, 13)
        map.enableScrollWheelZoom()

        // 添加比例尺控件
        const scaleControl = new BMapGL.ScaleControl()
        map.addControl(scaleControl)
        // 添加缩放控件
        const zoomControl = new BMapGL.ZoomControl()
        map.addControl(zoomControl)
        // 添加定位控件
        const locationControl = new BMapGL.LocationControl()
        map.addControl(locationControl)
        // 添加3D控件
        const navigationControl3D = new BMapGL.NavigationControl3D()
        map.addControl(navigationControl3D)
        // 添加全景地图控件（AK暂无权限）
        //   const panoramaControl = new BMapGL.PanoramaControl()
        //   map.addControl(panoramaControl)

        // 关键字提示输入
        const autocomplete = new BMapGL.Autocomplete({
          input: this.suggestRef.nativeElement,
          location: map
        })

        // 位置检索
        const localSearch = new BMapGL.LocalSearch(map, {
          renderOptions: {
            map: map,
            panel: this.resultRef.nativeElement
          }
        })
        localSearch.enableAutoViewport()
        localSearch.disableFirstResultSelection()
        localSearch.setInfoHtmlSetCallback((e) => {
          this.appChange.emit({
            province: e.province,
            city: e.city,
            address: e.address,
            point: e.point
          })
          // 当前查看的位置Mark居中
          map.panTo(new BMapGL.Point(e.point.lng, e.point.lat))
        })

        // 关键字提示输入点击后进行位置检索
        autocomplete.onconfirm = (e) => {
          this.suggestRef.nativeElement.blur()
          const { province, city, district, street, streetNumber, business } = e.item.value
          localSearch.setLocation(`${province}${city}${district}${street}${streetNumber}`)
          localSearch.search(business)
        }

        // autocomplete 无配置获取由BMAP渲染的输入提示列表DOM
        // 暂时先这样处理获取输入提示列表DOM，然后设置其最大高度，防止内容超出容器
        setTimeout(() => {
          const suggestionDomId = (autocomplete as any)._suggestion?.mainId
          this.suggestionRef = document.getElementById(suggestionDomId)
        }, 200)
      })
    })
  }

  ngOnDestroy(): void {
    this.ro.unobserve(this.wrapRef.nativeElement)
  }
}
