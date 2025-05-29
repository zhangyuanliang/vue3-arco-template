import type { Router, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'
import usePermission from '@/hooks/permission'
import { LOGIN_ROUTE_NAME, NOT_FOUND } from '../constants'
import { appRoutes } from '../routes'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    const Permission = usePermission()
    if (isLogin()) {
      if (userStore.role) {
        next()
      } else {
        try {
          await userStore.info()
          if (to.name === LOGIN_ROUTE_NAME) {
            const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || NOT_FOUND
            next(destination)
          } else {
            next()
          }
        } catch (error) {
          await userStore.logout()
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
        }
      }
    } else {
      if (to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
  })
}
