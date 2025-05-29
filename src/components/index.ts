import { App } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  //  LineChart, PieChart, RadarChart,
  // MapChart,
  EffectScatterChart,
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
  ToolboxComponent,
  TitleComponent,
  // TimelineComponent,
  // GeoComponent,
  // VisualMapComponent,

  // MarkPointComponent,
  // DatasetComponent,
  // TransformComponent,
} from 'echarts/components'
import Chart from './chart/index.vue'
import Breadcrumb from './breadcrumb/index.vue'

// Manually introduce ECharts modules to reduce packing size

use([
  CanvasRenderer,
  BarChart,
  // LineChart,
  // PieChart,
  // RadarChart,
  // MapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
  ToolboxComponent,
  EffectScatterChart,
  TitleComponent,
  // TimelineComponent,
  // GeoComponent,
  // VisualMapComponent,

  // MarkPointComponent,
  // DatasetComponent,
  // TransformComponent,
])

export default {
  install(Vue: App) {
    Vue.component('Chart', Chart)
    Vue.component('Breadcrumb', Breadcrumb)
  },
}
