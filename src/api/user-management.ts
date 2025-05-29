import axios from 'axios'

export interface UserManagementRecord {
  index: string | number
  salary: string | number
  address?: string
  email?: string
  cgsl: number
  cgje: number

  // 操作记录
  content?: ''
  userName?: ''
  updateTime?: ''
}

export interface UserManagementParams extends Partial<UserManagementRecord> {
  current: number
  pageSize: number
}

export interface UserManagementListRes {
  list: UserManagementRecord[]
  total: number
}

export function queryUserList(params: UserManagementParams) {
  return axios.get<UserManagementListRes>('/userManagement/list', { params })
}

export function queryUserDetailList(params: UserManagementParams) {
  return axios.get<UserManagementListRes>('/userManagementDetail/list', { params })
}
