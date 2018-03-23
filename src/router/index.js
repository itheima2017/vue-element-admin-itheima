import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/module-dashboard/views/layout'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('dashboard/views/login'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('dashboard/views/authredirect'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/views/index'),
        name: 'dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: {roles: ['admin']}, // you can set roles in root nav
    children: [
      {
        path: 'index',
        component: _import('dashboard/views/index'),
        name: 'permission',
        meta: {
          title: 'permission',
          icon: 'lock'
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: _import('dashboard/views/index'),
        name: 'icons',
        meta: {title: 'icons', icon: 'icon', noCache: true}
      }
    ]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      {
        path: 'tinymce',
        component: _import('dashboard/views/index'),
        name: 'tinymce-demo',
        meta: {title: 'tinymce'}
      },
      {
        path: 'markdown',
        component: _import('dashboard/views/index'),
        name: 'markdown-demo',
        meta: {title: 'markdown'}
      },
      {
        path: 'json-editor',
        component: _import('dashboard/views/index'),
        name: 'jsonEditor-demo',
        meta: {title: 'jsonEditor'}
      },
      {
        path: 'dnd-list',
        component: _import('dashboard/views/index'),
        name: 'dndList-demo',
        meta: {title: 'dndList'}
      }
    ]
  }
]
