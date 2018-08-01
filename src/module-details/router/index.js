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
    path: '/details',
    component: Layout,
    redirect: 'noredirect',
    name: 'details',
    meta: {
      title: 'details',
      icon: 'tab'
    },
    children: [
      {
        path: 'basics-details',
        component: _import('details/pages/basicsDetails'),
        name: 'basics-details',
        meta: {title: 'BasicsDetails'}
      },
      {
        path: 'senior-details',
        component: _import('details/pages/seniorDetails'),
        name: 'senior-details',
        meta: {title: 'seniorDetails'}
      }
    ]
  }
]
