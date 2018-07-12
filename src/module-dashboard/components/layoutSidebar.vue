<template>
  <scroll-bar>
    <el-menu mode="vertical" 
      :default-active="$route.path" 
      :collapse="isCollapse" 
      background-color="#001529" 
      text-color="#bfcbd9" 
      active-text-color="#fff"
      >
      <router-link to="/">
        <div class="sidebar-logo"><img src="../assets/banner-64.png" /></div>
        <div class="sidebar-logo-mini"><img src="../assets/logo-64.png" /></div>
      </router-link>
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './layoutSidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'layoutSidebar',
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
