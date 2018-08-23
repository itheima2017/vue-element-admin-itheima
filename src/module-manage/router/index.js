import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/base',
    component: Layout,
    redirect: 'noredirect',
    name: 'base',
    meta: {
      title: 'manage',
      icon: 'component'
    },
    children: [
      {
        path: 'users',
        component: _import('manage/pages/users'),
        name: 'base-users',
        meta: {title: 'users'}
      },
      {
        path: 'menus',
        name: 'base-menus',
        component: _import('manage/pages/menus'),
        meta: {title: 'menus'}
      },
      {
        path: 'permissions',
        name: 'base-permissions',
        component: _import('manage/pages/permissions'),
        meta: {title: 'permissions'}
      },
      {
        path: 'logs',
        name: 'base-logs',
        component: _import('manage/pages/logs'),
        meta: {title: 'logs'}
      }
    ]
  }
]
