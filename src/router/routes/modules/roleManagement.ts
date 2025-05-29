import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const ROLEMANAGEMENT: AppRouteRecordRaw = {
  path: '/role-management',
  name: 'RoleManagement',
  component: DEFAULT_LAYOUT,
  redirect: '/role-management/index',
  meta: {
    locale: 'menu.roleManagement',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 2,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'RoleManagementIndex',
      component: () => import('@/views/role-management/index.vue'),
      meta: {
        locale: 'menu.roleManagement.index',
        requiresAuth: true,
        roles: ['*'],
        activeMenu: 'RoleManagement',
      },
    },
  ],
}

export default ROLEMANAGEMENT
