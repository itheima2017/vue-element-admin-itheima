/*
 * @Author: taoshiwei <taoshiwei@itcast.cn> 
 * @Description: 示例业务模块 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-04-16 18:01:06
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: _import('example/pages/index'),
        name: 'example-index',
        meta: {title: 'index'}
      }
    ]
  }
]
