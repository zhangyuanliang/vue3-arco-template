import { mock } from 'mockjs'
import setupMock, { successResponseWrap, failResponseWrap, successResponse } from '@/utils/setup-mock'

import { MockParams } from '@/types/mock'
import { isLogin } from '@/utils/auth'

const scretKey =
  '30819f300d06092a864886f70d010101050003818d00308189028181009a07b42516353d432b87f8ed01d182483ddc1b21b08072d115785a52b96a3688ab1ab7838ad766865c082ab20cbfaacd563fdf40678ffbb940046db6fec84b3d2c6442e4797a477edfef304b5c030c8e8859854245326c4606cc09dc557e995dffe88bcd5f26a77403c535f824b2cbd2f8b2de6475b3ab063cf89d0aea328f790203010001'

setupMock({
  mock: import.meta.env.VITE_OPEN_MOCK !== 'false',
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    mock(new RegExp('/dev-api/secretkey'), () => {
      return {
        code: 200,
        msg: '操作成功',
        secretKey: scretKey,
        uuid: 'b852eead41ef4cea8b956dcd771c946f',
      }
    })

    mock(new RegExp('/dev-api/code'), () => {
      return {
        captchaEnabled: true,
        code: 200,
        img: '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',
        msg: '操作成功',
        uuid: '88e42d2f4a154a068a072694fb2e3473',
      }
    })

    // 用户信息
    mock(new RegExp('/dev-api/system/user/getInfo'), () => {
      if (isLogin()) {
        return successResponse({
          user: {
            id: '1',
            createBy: '1',
            createByName: '超级管理员',
            createTime: '2022-08-23 11:38:01',
            updateBy: '1',
            updateByName: '超级管理员',
            updateTime: '2023-11-20 17:07:36',
            userId: '1',
            userName: 'admin',
            loginPhone: '',
            nickName: '超级管理员',
            idCardNo: '222222222222222222',
            contactPhone: null,
            password: null,
            userStatus: 'NORMAL',
            delYn: 'N',
            userType: 'OPERATE',
            loginTime: '2023-11-20 17:07:36',
            lastOperatorId: null,
            lastOperatorName: null,
            lastOperatorTime: null,
            avatar: null,
            images: [],
            roles: null,
            roleIds: null,
            roleId: null,
            needChangePassword: false,
            admin: true,
          },
        })
      }
      return failResponseWrap(null, '未登录', 50008)
    })

    // 登录
    mock(new RegExp('/auth/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password) {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          access_token: '12345',
          refresh_token: '11111',
        })
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '54321',
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    })

    // 登出
    mock(new RegExp('/dev-api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 用户的服务端菜单
    mock(new RegExp('/dev-api/user/menu'), () => {
      const menuList = [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            locale: 'menu.server.dashboard',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 1,
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              meta: {
                locale: 'menu.server.workplace',
                requiresAuth: true,
              },
            },
            {
              path: 'https://arco.design',
              name: 'arcoWebsite',
              meta: {
                locale: 'menu.arcoWebsite',
                requiresAuth: true,
              },
            },
          ],
        },
      ]
      return successResponseWrap(menuList)
    })
  },
})
