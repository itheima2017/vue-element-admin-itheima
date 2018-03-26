<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<layout-sidebar class="sidebar-container"></layout-sidebar>
		<div class="main-container">
			<layout-navbar></layout-navbar>
			<layout-tags></layout-tags>
			<layout-app-main></layout-app-main>
		</div>
	</div>
</template>

<script>
import layoutNavbar from './../components/layoutNavbar'
import layoutSidebar from './../components/layoutSidebar'
import layoutTags from './../components/layoutTags'
import layoutAppMain from './../components/layoutAppMain'

export default {
  name: 'layout',
  components: {
    layoutNavbar,
    layoutSidebar,
    layoutTags,
    layoutAppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
