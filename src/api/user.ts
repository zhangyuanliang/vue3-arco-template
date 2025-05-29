import axios from 'axios'
import type { RouteRecordNormalized } from 'vue-router'
import { UserInfo } from '@/store/modules/user/types'
import type { BaseResponse } from '@/api/interceptor'

export interface LoginData {
  username: string
  password: string | boolean
  code: string
  keyId: string
  rememberMe: boolean
  confirmPassword?: string
}

export interface LoginRes {
  access_token: string
  refresh_token: string
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/auth/login', data)
}

export function logout() {
  return axios.post<LoginRes>('/user/logout')
}

export interface UserInfoResponse extends BaseResponse {
  user: UserInfo
}
export function getUserInfo(): Promise<UserInfoResponse> {
  return axios.get('/system/user/getInfo')
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/user/menu')
}

export interface Secretkey {
  secretKey: string
  uuid: string
}

export interface SecretkeyResponse extends BaseResponse {
  secretKey: unknown
  uuid: unknown
}

export function querySecretkey(): Promise<SecretkeyResponse> {
  return axios.get('/secretkey')
}

export interface CodeResponse extends BaseResponse {
  captchaEnabled: boolean
  img: string
  uuid: string
}

export function queryCode(): Promise<CodeResponse> {
  return axios.get('/code')
}
