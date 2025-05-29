export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserInfo {
  // name?: string
  // avatar?: string
  // job?: string
  // organization?: string
  // location?: string
  // email?: string
  // introduction?: string
  // personalWebsite?: string
  // jobName?: string
  // organizationName?: string
  // locationName?: string
  // phone?: string
  // registrationDate?: string
  // accountId?: string
  // certification?: number
  // role: RoleType
  // secretKey: string
  // keyId: string

  id: string
  createBy: string
  createByName: string
  createTime: string
  updateBy: string
  updateByName: string
  updateTime: string
  userId: string
  userName: string
  loginPhone: string
  nickName: string
  idCardNo: string
  contactPhone: string | null
  password: string | null
  userStatus: string
  delYn: string
  userType: string
  loginTime: string
  lastOperatorId: string | null
  lastOperatorName: string | null
  lastOperatorTime: string | null
  avatar: string | null
  images: string[]
  role: string
  roles: string
  roleIds: string | null
  roleId: string | null
  needChangePassword: boolean
  admin: boolean
}

export interface UserState extends UserInfo {
  secretKey: string
  keyId: string
  userTypeName: string
}
