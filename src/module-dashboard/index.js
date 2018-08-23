// vue-router
import {asyncRouterMap} from '@/router'
import routerMaps from './router'
// vuex
import app from './store/app'
import errorLog from './store/errorLog'
import permission from './store/permission'
import tagsView from './store/tagsView'
import user from './store/user'

export default {
  install(module, store) {
    // 注册路由
    // asyncRouterMap.push(routerMaps[0])
    // 注册状态管理
    if (store !== undefined) {
      store.registerModule('app', app)
      store.registerModule('errorLog', errorLog)
      store.registerModule('permission', permission)
      store.registerModule('tagsView', tagsView)
      store.registerModule('user', user)
    }
  }
}
