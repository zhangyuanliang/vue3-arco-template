import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout, getUserInfo, LoginData, querySecretkey } from '@/api/user'
import { setToken, clearToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import { isString } from '@/utils/is'
import { JSEncrypt } from 'jsencrypt'
import { UserState } from './types'
import useAppStore from '../app'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    admin: false,
    avatar: '',
    contactPhone: null,
    createBy: '',
    createByName: '',
    createTime: '',
    delYn: '',
    id: '',
    idCardNo: '',
    images: [],
    lastOperatorId: null,
    lastOperatorName: null,
    lastOperatorTime: null,
    loginPhone: '',
    loginTime: '',
    needChangePassword: false,
    nickName: '',
    password: null,
    roleId: null,
    roleIds: null,
    role: '',
    roles: '',
    updateBy: '',
    updateByName: '',
    updateTime: '',
    userId: '',
    userName: '',
    userStatus: '',
    userType: '',
    secretKey: '',
    keyId: '',
    userTypeName: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    switchRoles() {
      return new Promise(resolve => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      const { user } = await getUserInfo()

      this.setInfo({
        ...user,
        role: user.admin ? 'admin' : 'user',
      })
    },

    async getSecretKey() {
      const data = await querySecretkey()
      if (isString(data.secretKey)) {
        this.secretKey = data.secretKey
      }
      if (isString(data?.uuid)) {
        this.keyId = data.uuid
      }
    },

    async encrypt(params: LoginData) {
      if (!this.secretKey) await this.getSecretKey()
      if (typeof params.password === 'string' && this.secretKey) {
        const encryptor = new JSEncrypt()

        encryptor.setPublicKey(this.secretKey)
        params.password = encryptor.encrypt(params.password)
        params.keyId = this.keyId

        delete params.confirmPassword
      }

      return params
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const param: LoginData = await this.encrypt(loginForm)
        const res = await userLogin(param)
        setToken(res.data.access_token)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      this.resetInfo()
      clearToken()
      removeRouteListener()
      appStore.clearServerMenu()
    },
    // Logout
    async logout() {
      try {
        await userLogout()
      } finally {
        this.logoutCallBack()
      }
    },
  },
})

export default useUserStore
