<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <router-link to="/">
        <div class="sidebar-logo">vueAdmin</div>
        <div class="sidebar-logo-mini">V</div>
      </router-link>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import {mapGetters} from 'vuex'
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'layoutSidebar',
  components: {SidebarItem, ScrollBar},
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sidebar-logo ,.sidebar-logo-mini {
    color: rgb(191, 203, 217);
    font-size: 28px;
    text-align: center;
    line-height: 56px;
    margin: 0px;
    padding: 0px;
  }
  .sidebar-logo {
    width:180px;
    height:56px;
  }
  .sidebar-logo-mini {
    display: none;
    width:36px;
    height:56px;
  }
  .hideSidebar {
    .sidebar-logo {
      display: none;
    }
    .sidebar-logo-mini {
      display: block;
    }
  }
</style>
