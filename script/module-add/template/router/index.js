/*
 * @Author: {{author}} 
 * @Description: {{description}} 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-05-22 17:04:36
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/{{name}}',
    component: Layout,
    redirect: 'noredirect',
    name: '{{name}}',
    meta: {
      title: '{{name}}管理',
      icon: 'component'
    },
    children: [
      {
        path: 'table',
        component: _import('{{name}}/pages/index'),
        name: '{{name}}-table',
        meta: {title: '列表模块'}
      }
    ]
  }
]
