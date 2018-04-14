/*
 * @Author: {{author}} 
 * @Description: {{description}} 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-04-13 16:15:40
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/{{name}}',
    component: Layout,
    redirect: 'noredirect',
    name: '{{name}}',
    meta: {
      title: '{{name}}',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('{{name}}/pages/index'),
        name: '{{name}}-index',
        meta: {title: 'index'}
      }
    ]
  }
]
