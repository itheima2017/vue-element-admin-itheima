/*
 * @Author: taoshiwei <taoshiwei@itcast.cn> 
 * @Description: 列表页 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-04-17 09:48:44
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/list',
    component: Layout,
    redirect: 'noredirect',
    name: 'list',
    meta: {
      title: 'list',
      icon: 'table'
    },
    children: [
      {
        path: 'table-list',
        component: _import('list/pages/table-list'),
        name: 'table-list',
        meta: {title: 'tableList'}
      },
      {
        path: 'basic-list',
        component: _import('list/pages/basic-list'),
        name: 'basic-list',
        meta: {title: 'basicList'}
      },
      {
        path: 'card-list',
        component: _import('list/pages/card-list'),
        name: 'card-list',
        meta: {title: 'cardList'}
      }
    ]
  }
]
