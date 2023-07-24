const Layout = () => import('@/layout/index.vue')

export default {
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
}
