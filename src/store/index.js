import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/src/module-dashboard/store/app'
import errorLog from '@/src/module-dashboard/store/errorLog'
import permission from '@/src/module-dashboard/store/permission'
import tagsView from '@/src/module-dashboard/store/tagsView'
import user from '@/src/module-dashboard/store/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
