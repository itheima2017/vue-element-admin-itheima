
/**
 * 导入模块路由
 **/
import {DashboardRouter} from '@/module-dashboard/router'// 面板

/**
 * 业务路由
 **/
let routerMap = [
  {path: '*', redirect: '/404', hidden: true}
]

/**
 * 合并路由
 **/
routerMap = routerMap.concat(DashboardRouter) // 面板

export const asyncRouterMap = routerMap
