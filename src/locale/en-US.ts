import localeLogin from '@/views/login/locale/en-US'

import localeSettings from './settings/zh-CN'

export default {
  'menu.userManagement': 'User',
  'menu.userManagement.index': 'User-Server',
  'menu.roleManagement': 'Role',
  'menu.roleManagement.index': 'Role-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeLogin,
}
