import axios from 'axios'

export interface RoleManagementRecord {
  index: string | number
  salary: string | number
  address?: string
  email?: string
  cgsl: number
  cgje: number
}

export interface RoleManagementParams extends Partial<RoleManagementRecord> {
  current: number
  pageSize: number
}

export interface RoleManagementListRes {
  list: RoleManagementRecord[]
  total: number
}

export function queryRoleManagementList(params: RoleManagementParams) {
  return axios.get<RoleManagementListRes>('/roleManagement/list', { params })
}

export interface IFormModel {
  hospitalName: string
  role: string
  authStr: string
  status: string
  sort: string
  reason: string
}

export function addRole(params: IFormModel) {
  return axios.post<RoleManagementListRes>('/roleManagement/add', { params })
}
