import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core'
import * as echarts from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import PositionMapComponent, {
  type PositionInfo
} from '@/app/components/position-map/position-map.component'
import { ResizeDirective } from '@/app/directives/resize/resize.directive'

// echarts 按需加载使用
echarts.use([GridComponent, TooltipComponent, BarChart, CanvasRenderer])

@Component({
  imports: [PositionMapComponent, ResizeDirective],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  standalone: true
})
export default class HomeComponent implements AfterViewInit {
  @ViewChild('chart') chartDom!: ElementRef<HTMLDivElement>

  constructor(private zone: NgZone) {}
  myChart!: echarts.ECharts

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.myChart = echarts.init(this.chartDom.nativeElement)
      // 绘制图表
      this.myChart.setOption({
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
    })
  }

  changeHandler(res: PositionInfo) {
    console.log(res)
  }

  resizeChangeHandler() {
    if (this.myChart) this.myChart.resize()
  }
}
