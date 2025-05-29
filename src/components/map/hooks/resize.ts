import { debounce } from 'lodash-es'
import { EChartsType } from 'echarts/types/dist/echarts'

export default function useResize() {
  const myChart = ref<EChartsType>()
  const resizeHandler = debounce(() => {
    if (myChart.value) {
      myChart.value.resize()
    }
  }, 200)

  const initResizeEvent = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const destroyResizeEvent = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  onMounted(() => {
    initResizeEvent()
  })

  onBeforeUnmount(() => {
    destroyResizeEvent()
    if (myChart.value) {
      myChart.value.dispose()
      myChart.value.off('click')
    }
  })

  onActivated(() => {
    initResizeEvent()
  })

  onDeactivated(() => {
    destroyResizeEvent()
  })

  // 在 myChart 变化时重新初始化 resize 事件
  watchEffect(() => {
    if (myChart.value) {
      initResizeEvent()
    }
  })
  return {
    myChart,
  }
}
