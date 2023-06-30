import { AfterViewInit, Component, ElementRef, ViewChild, NgZone, OnDestroy } from '@angular/core'
import { PositionInfo } from '@/app/shared/position-map/position-map.component'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
// echarts 按需加载使用
echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer])

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') chartDom!: ElementRef<HTMLDivElement>

  constructor(private zone: NgZone) {}

  ro!: ResizeObserver

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const myChart = echarts.init(this.chartDom.nativeElement)
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
      // resize 处理
      this.ro = new ResizeObserver(() => {
        myChart.resize()
      })
      this.ro.observe(this.chartDom.nativeElement)
    })
  }

  changeHandler(res: PositionInfo) {
    console.log(res)
  }

  ngOnDestroy() {
    this.ro.unobserve(this.chartDom.nativeElement)
  }
}
