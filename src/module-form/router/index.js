/*
 * @Author: taoshiwei <taoshiwei@itcast.cn> 
 * @Description: 表单页 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-04-17 09:29:01
 */
import activePublic from '../pages/activePublic/index'
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
    children: [{
        path: 'basic-form',
        component: _import('form/pages/index'),
        name: 'basic-form',
        meta: {
          title: 'basicForm'
        }
      },
      {
        path: 'step-form',
        component: _import('form/pages/activePublic/index'),
        name: 'step-form',
        meta: {
          title: 'stepForm'
        },
        children: [
          {
          path: '/',
          component: _import('form/pages/activePublic/step1'),
          name: 'step0',
          meta: {
            title: 'step'
          }
        },
        {
          path: 'step1',
          component: _import('form/pages/activePublic/step1'),
          name: 'step1',
          meta: {
            title: 'step'
          }
        },
        {
          path: 'step2',
          component: _import('form/pages/activePublic/step2'),
          name: 'step2',
          meta: {
            title: 'step'
          }
        },
        {
          path: 'step3',
          component: _import('form/pages/activePublic/step3'),
          name: 'step3',
          meta: {
            title: 'step'
          }
        }]
      },
      {
        path: 'senior-form',
        component: _import('form/pages/senior-form'),
        name: 'senior-form',
        meta: {
          title: 'advancedList'
        }
      }
      // {
      //   path: '/activePublic',
      //   component: activePublic,
      //   children: [  
      //     {
      //       path: '/',
      //       component: _import('form/pages/activePublic/step1'),
      //       name: 'step0',
      //       meta: {
      //         title: 'step'
      //       }
      //     },
      //     {
      //       path: 'step1',
      //       component: _import('form/pages/activePublic/step1'),
      //       name: 'step1',
      //       meta: {
      //         title: 'step'
      //       }
      //     },
      //     {
      //       path: 'step2',
      //       component: _import('form/pages/activePublic/step2'),
      //       name: 'step2',
      //       meta: {
      //         title: 'step'
      //       }
      //     },
      //     {
      //       path: 'step3',
      //       component: _import('form/pages/activePublic/step3'),
      //       name: 'step3',
      //       meta: {
      //         title: 'step'
      //       }
      //     }
      //   ]
      // }
    ]
    
  }
  // {
  //   path: '/',
  //   component: activePublic,
  //   children: [  
  //     {
  //       path: '/',
  //       component: _import('form/pages/activePublic/step1'),
  //       name: 'step0',
  //       meta: {
  //         title: 'step'
  //       }
  //     },
  //     {
  //       path: 'step1',
  //       component: _import('form/pages/activePublic/step1'),
  //       name: 'step1',
  //       meta: {
  //         title: 'step'
  //       }
  //     },
  //     {
  //       path: 'step2',
  //       component: _import('form/pages/activePublic/step2'),
  //       name: 'step2',
  //       meta: {
  //         title: 'step'
  //       }
  //     },
  //     {
  //       path: 'step3',
  //       component: _import('form/pages/activePublic/step3'),
  //       name: 'step3',
  //       meta: {
  //         title: 'step'
  //       }
  //     }
  //   ]
  // }
]
