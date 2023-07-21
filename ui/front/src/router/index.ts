import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true
    },
    alias: '/:pathMatch(.*)*'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          svgIcon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/system-config',
    component: Layout,
    redirect: 'noRedirect',
    name: 'System-Config',
    meta: {
      title: '系统配置管理',
      iIcon: '&#xe669;',
      roles: ['admin'],
      alwaysShow: true
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/system-config/index.vue'),
        name: 'SystemConfig',
        meta: {
          title: '系统配置列表',
          iIcon: '&#xe630;',
          roles: ['admin'],
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/user-manage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'User-Manage',
    meta: {
      title: '用户信息管理',
      iIcon: '&#xe663;',
      roles: ['admin'],
      alwaysShow: true
    },
    children: [
      {
        path: 'user-log',
        component: () => import('@/views/user-manage/user-log.vue'),
        name: 'UserLog',
        meta: {
          title: '用户日志',
          roles: ['admin'],
          iIcon: '&#xe6ac;',
          keepAlive: false
        }
      },
      {
        path: 'user-list',
        component: () => import('@/views/user-manage/user-list.vue'),
        name: 'UserList',
        meta: {
          title: '用户列表',
          iIcon: '&#xe659;',
          roles: ['admin'],
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'ErrorPage',
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/** 重置路由 */
export function resetRouter() {
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    window.location.reload()
  }
}

export default router
