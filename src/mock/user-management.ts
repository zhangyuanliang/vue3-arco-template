import { mock } from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

setupMock({
  mock: import.meta.env.VITE_OPEN_MOCK !== 'false',
  setup: () => {
    mock(new RegExp('/dev-api/userManagement/list'), () => {
      return successResponseWrap({
        list: Array.from({ length: 30 }).map((_, idx) => ({
          id: mock('@id()'),
          index: idx + 1,
          loginName: 'yjx',
          userName: '杨菊香',
          hospital: '南京江北医院',
          yqmc: '江北院区',
          sqwzlx: '后勤耗材, 医疗耗材',
          sqzxck: '中心库房,后勤物资库',
          sqks: '设备科库房,品牌部',
          sqkskf: '设备科库房,品牌部',
          yhzt: '正常',
          wxh: 'wx_id',
          phone: '13231222341',
          role: '超级管理员',
          czr: '超级管理员',
          updateTime: '2023-12-18 16:13:25',
        })),
        total: 30,
      })
    })

    mock(new RegExp('/dev-api/userManagementDetail/list'), () => {
      return successResponseWrap({
        list: [
          {
            id: 1,
            index: 1,
            content: '操作内容1111',
            userName: '杨菊香',
            updateTime: '2023-12-18 16:13:25',
          },
          {
            id: 2,
            index: 2,
            content: '操作内容2222',
            userName: '杨菊香2',
            updateTime: '2023-12-18 16:13:25',
          },
          {
            id: 3,
            index: 3,
            userName: '杨菊香3',
            content: '操作内容3333',
            updateTime: '2023-12-18 16:13:25',
          },
        ],
        total: 1,
      })
    })
  },
})
