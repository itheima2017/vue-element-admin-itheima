/*
 * @Author: taoshiwei <taoshiwei@itcast.cn> 
 * @Description: 表单页 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-04-17 09:29:01
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      {
        path: 'basic-form',
        component: _import('form/pages/index'),
        name: 'basic-form',
        meta: {title: 'basicForm'}
      },
      {
        path: 'step-form',
        component: _import('form/pages/index'),
        name: 'step-form',
        meta: {title: 'stepForm'}
      },
      {
        path: 'advanced-list',
        component: _import('form/pages/index'),
        name: 'advanced-list',
        meta: {title: 'advancedList'}
      }
    ]
  }
]
