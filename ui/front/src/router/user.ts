const Layout = () => import('@/layout/index.vue')

export default {
  path: '/manage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Manage',
  meta: {
    title: '管理',
    svgIcon: 'menu',
    roles: ['admin'],
    alwaysShow: true
  },
  children: [
    {
      path: 'user',
      // component: () => import('@/views/manage/user.vue'),
      name: 'User',
      meta: {
        title: '用户管理',
        roles: ['admin'],
        keepAlive: true
      }
    }
  ]
}
