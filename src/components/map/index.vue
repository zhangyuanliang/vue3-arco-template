<template>
  <div class="echarts">
    <div ref="mapRef" style="width: 100%; height: 100%"></div>
    <div class="mapChoose">
      <span v-for="item in parentInfo" :key="item.code">
        <span class="title" @click="goBack">
          <span v-if="item.code !== 100000" class="flex-v">
            <icon-left :size="20" />
            返回
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts/core'
import { onMounted, ref } from 'vue'
import useResize from './hooks/resize'

defineOptions({
  name: 'BoardMap',
})

const { myChart } = useResize()
const mapRef = ref()
const geoJson = ref({
  features: [],
})
const generateParentInfo = () => {
  return [
    {
      cityName: '全国',
      code: 100000,
    },
  ]
}
const parentInfo = ref(generateParentInfo())
const timeTitle = ref(['2018', '2019', '2020'])

// const grideCompute = computed(() => {
//   if (parentInfo.value.code !== 100000) {
//     return {
//       right: '2%',
//       top: '12%',
//       bottom: '8%',
//       width: '20%',
//     }
//   }
//   return {
//     right: '2%',
//     top: '12%',
//     bottom: '8%',
//     width: '20%',
//   }
// })

const getGeoJson = adcode => {
  AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
    var districtExplorer = new DistrictExplorer()
    districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
      if (error) {
        console.error(error)
        return
      }

      let Json = areaNode.getSubFeatures()
      if (Json.length > 0) {
        geoJson.value.features = Json
      } else if (Json.length === 0) {
        geoJson.value.features = geoJson.value.features.filter(item => item.properties.adcode == adcode)
        if (geoJson.value.features.length === 0) return
      }

      getMapData()
    })
  })
}

const getMapData = () => {
  let mapData = {},
    pointData = {},
    sum = {}

  timeTitle.value.forEach(item => {
    mapData[item] = []
    pointData[item] = []
    sum[item] = 0

    geoJson.value.features.forEach(j => {
      let value = Math.random() * 3000

      mapData[item].push({
        name: j.properties.name,
        value: value,
        cityCode: j.properties.adcode,
      })

      pointData[item].push({
        name: j.properties.name,
        value: [j.properties.center[0], j.properties.center[1], value],
        cityCode: j.properties.adcode,
      })

      sum[item] += value
    })

    mapData[item] = mapData[item].sort((a, b) => b.value - a.value)
  })

  initEcharts(mapData, pointData, sum)
}

const initEcharts = (mapData, pointData, sum) => {
  myChart.value = echarts.init(mapRef.value)
  if (parentInfo.value.length === 1) {
    echarts.registerMap('china', geoJson.value) //注册
  } else {
    echarts.registerMap('map', geoJson.value) //注册
  }
  var option = {
    timeline: {
      data: timeTitle.value,
      axisType: 'category',
      // autoPlay: true,
      // playInterval: 3000,
      replaceMerge: ['xAxis', 'series'],
      left: '10%',
      right: '10%',
      bottom: '2%',
      width: '80%',
      label: {
        color: 'rgb(179, 239, 255)',
      },
      emphasis: {
        label: {
          color: '#fff',
        },
      },
      symbolSize: 10,
      lineStyle: {
        color: '#8df4f4',
      },
      checkpointStyle: {
        borderColor: '#8df4f4',
        color: '#53D9FF',
        borderWidth: 2,
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        color: '#53D9FF',
        borderColor: '#53D9FF',
      },
      emphasis: {
        controlStyle: {
          color: 'rgb(58,115,192)',
          borderColor: 'rgb(58,115,192)',
        },
      },
    },
    baseOption: {
      animation: true,
      animationDuration: 900,
      animationEasing: 'cubicInOut',
      animationDurationUpdate: 900,
      animationEasingUpdate: 'cubicInOut',
      grid: {
        right: '2%',
        top: '12%',
        bottom: '8%',
        width: '20%',
      },
      geo: {
        map: parentInfo.value.length === 1 ? 'china' : 'map',
        zoom: parentInfo.value.length === 1 ? 1.1 : 1,
        roam: true,
        center: parentInfo.value.length === 1 ? ['118.83531246', '34.0267395887'] : false,
        label: {
          show: true,
          color: 'rgb(249, 249, 249)',
          formatter: p => {
            switch (p.name) {
              case '内蒙古自治区':
                p.name = '内蒙古'
                break
              case '西藏自治区':
                p.name = '西藏'
                break
              case '新疆维吾尔自治区':
                p.name = '新疆'
                break
              case '宁夏回族自治区':
                p.name = '宁夏'
                break
              case '广西壮族自治区':
                p.name = '广西'
                break
              case '香港特别行政区':
                p.name = '香港'
                break
              case '澳门特别行政区':
                p.name = '澳门'
                break
              default:
                p.name = p.name.replace(/省|市/g, '')
                break
            }
            return p.name
          },
        },
        itemStyle: {
          areaColor: '#24CFF4',
          borderColor: '#53D9FF',
          borderWidth: 1.3,
          shadowBlur: 15,
          shadowColor: 'rgb(58,115,192)',
          shadowOffsetX: 7,
          shadowOffsetY: 6,
        },
        emphasis: {
          label: {
            show: true,
            color: '#f75a00',
          },
          itemStyle: {
            areaColor: '#8dd7fc',
            borderWidth: 1.6,
            shadowBlur: 25,
          },
        },
      },
    },
    options: [],
  }

  timeTitle.value.forEach(item => {
    let xData = [],
      yData = []
    let min = mapData[item][mapData[item].length - 1].value
    let max = mapData[item][0].value
    if (mapData[item].length === 1) {
      min = 0
    }
    mapData[item].forEach(c => {
      xData.unshift(c.name)
      yData.unshift(c.value)
    })

    option.options.push({
      title: [
        {
          left: 'center',
          top: 10,
          text: '采购金额统计图(可点击下钻到省)',
          textStyle: {
            color: 'rgb(179, 239, 255)',
            fontSize: 16,
          },
        },
        {
          text: '总金额：' + sum[item].toFixed(2) + '万',
          left: 'center',
          top: 35,
          textStyle: {
            color: '#FFAC50',
            fontSize: 20,
          },
        },
      ],
      tooltip: {},
      visualMap: [
        {
          show: true,
          min: min,
          max: max,
          left: '3%',
          bottom: '5%',
          calculable: true,
          seriesIndex: [0],
          inRange: {
            color: ['#24CFF4', '#2E98CA', '#1E62AC'],
          },
          textStyle: {
            color: '#24CFF4',
          },
        },
      ],
      xAxis: {
        type: 'value',
        scale: true,
        position: 'top',
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#455B77',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          margin: 2,
          fontSize: 12,
          color: '#c0e6f9',
        },
      },
      yAxis: {
        type: 'category',
        nameGap: 16,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#455B77',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          color: '#c0e6f9',
        },
        data: xData,
      },
      series: [
        {
          name: '额度',
          type: 'map',
          geoIndex: 0,
          map: parentInfo.value.length === 1 ? 'china' : 'map',
          roam: true,
          zoom: 1.3,
          tooltip: {
            trigger: 'item',
            formatter: p => {
              let val = p.value
              if (p.name == '南海诸岛') return
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon = "<div style='text-align:left'>" + p.name + ':<br />金额：' + val.toFixed(2) + '万</div>'
              return txtCon
            },
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          data: mapData[item],
        },
        {
          name: '散点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          tooltip: {
            trigger: 'item',
            formatter: p => {
              let val = p.value[2]
              if (p.name == '南海诸岛') return
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon = "<div style='text-align:left'>" + p.name + ':<br />金额额：' + val.toFixed(2) + '万</div>'
              return txtCon
            },
          },
          rippleEffect: {
            brushType: 'fill',
          },
          itemStyle: {
            color: '#F4E925',
            shadowBlur: 10,
            shadowColor: '#333',
          },
          data: pointData[item],
          symbolSize: function (val) {
            let value = val[2]
            if (value == max) {
              return 27
            }
            return 10
          },
          showEffectOn: 'render', //加载完毕显示特效
        },
        {
          name: '柱状图',
          type: 'bar',
          barGap: '-100%',
          barCategoryGap: '55%',
          tooltip: {
            trigger: 'item',
            formatter: p => {
              let val = p.value
              if (p.name == '南海诸岛') return
              if (window.isNaN(val)) {
                val = 0
              }
              let txtCon = "<div style='text-align:left'>" + p.name + ':<br />金额：' + val.toFixed(2) + '万</div>'
              return txtCon
            },
          },
          itemStyle: {
            borderRadius: 30,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgb(57,89,255,1)',
              },
              {
                offset: 1,
                color: 'rgb(46,200,207,1)',
              },
            ]),
          },
          emphasis: {
            itemStyle: {
              show: false,
            },
          },
          data: yData,
        },
      ],
    })
    console.log(option)
    myChart.value.setOption(option, true)
    myChart.value.off('click')
    myChart.value.on('click', echartsMapClick)
  })
}

const echartsMapClick = params => {
  if (!params.data || params.seriesType == 'bar') {
    return
  }
  if (parentInfo.value.length === 2) {
    return
  }
  let data = params.data
  parentInfo.value.push({
    cityName: data.name,
    code: data.cityCode,
  })
  getGeoJson(data.cityCode)
}

// const chooseArea = (val, index) => {
//   if (parentInfo.value.length === index + 1) {
//     return
//   }
//   parentInfo.value.splice(index + 1)
//   getGeoJson(parentInfo.value[parentInfo.value.length - 1].code)
// }

const goBack = () => {
  getGeoJson(100000)
  parentInfo.value = generateParentInfo()
}

onMounted(() => {
  getGeoJson(100000)
})
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('@/assets/images/map-bg.jpg') no-repeat;
  background-size: 100% 100%;
}

.mapChoose {
  position: absolute;
  left: 20px;
  top: 8px;
  color: #eee;

  .title {
    padding: 5px;
    color: rgba(147, 235, 248, 0.8);
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }

  .icon {
    font-family: 'simsun';
    font-size: 14px;
    margin: 0 11px;
  }
}
</style>
