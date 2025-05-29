import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const USERMANAGEMENT: AppRouteRecordRaw = {
  path: '/user-management',
  name: 'UserManagement',
  component: DEFAULT_LAYOUT,
  redirect: '/user-management/index',
  meta: {
    locale: 'menu.userManagement',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'UserManagementIndex',
      component: () => import('@/views/user-management/index.vue'),
      meta: {
        locale: 'menu.userManagement.index',
        requiresAuth: true,
        roles: ['*'],
        activeMenu: 'UserManagement',
      },
    },
  ],
}

export default USERMANAGEMENT
