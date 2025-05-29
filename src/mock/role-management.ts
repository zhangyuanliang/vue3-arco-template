import { mock } from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'

setupMock({
  mock: import.meta.env.VITE_OPEN_MOCK !== 'false',
  setup: () => {
    mock(new RegExp('/dev-api/roleManagement/list'), () => {
      return successResponseWrap({
        list: Array.from({ length: 30 }).map((_, idx) => ({
          id: mock('@id()'),
          index: idx + 1,
          hospital: '南京江北医院',
          role: '超级管理员',
          qxzf: 'id_wreweasdf',
          px: idx + 1,
          status: '启用',
          czr: '超级管理员',
          updateTime: '2023-12-18 16:13:25',
        })),
        total: 30,
      })
    })
  },
})
