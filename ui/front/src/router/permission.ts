import router from '@/router'
import { useUserStoreHook } from '@/store/modules/user'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { message } from 'ant-design-vue'
import { whiteList } from '@/config/white-list'
import asyncRouteSettings from '@/config/async-route'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const storage = useStorage()

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  storage.set('currentPath', to.path)
  // 判断该用户是否登录
  if (storage.get('isLogin')) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (userStore.roles.length === 0) {
        try {
          if (asyncRouteSettings.open) {
            await userStore.getInfo()
            const roles = userStore.roles
            permissionStore.setRoutes(roles)
          } else {
            userStore.setRoles(asyncRouteSettings.defaultRoles)
            permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
          }
          permissionStore.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (err: any) {
          console.log(err)
          userStore.resetState()
          // console.log(err)
          message.error(err || '路由守卫过程发生错误')
          next('/login')
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    try {
      if (asyncRouteSettings.open) {
        await userStore.getInfo()
        const roles = userStore.roles
        permissionStore.setRoutes(roles)
      } else {
        userStore.setRoles(asyncRouteSettings.defaultRoles)
        permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
      }
      permissionStore.dynamicRoutes.forEach((route) => {
        router.addRoute(route)
      })
      next({ ...to, replace: true })
    } catch (err: any) {
      console.log(err)
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
