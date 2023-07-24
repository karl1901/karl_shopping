const Layout = () => import('@/layout/index.vue')

export default {
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
}
