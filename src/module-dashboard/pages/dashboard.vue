<template>
  <div class="dashboard-container">
    test
  </div>
</template>

<script>
import { hasPermissionPoint } from '@/utils/permission'

export default {
  name: 'dashboard',
  components: {},
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
    // 权限点检查
    let hasList = hasPermissionPoint('base-users-list')
    console.log(hasList)
  }
}
</script>
