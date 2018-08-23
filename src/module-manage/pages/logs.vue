<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card shadow="never">
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- 数据 -->
        <el-table :key='tableKey' :data="dataList"  fit highlight-current-row
        style="width: 100%" border>
          <el-table-column align="center" :label="$t('table.operationType')">
            <template slot-scope="scope">
              <span>{{scope.row.type}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operator')">
            <template slot-scope="scope">
              <span>{{scope.row.author}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.results')">
            <template slot-scope="scope">
              <span>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operationDate')">
            <template slot-scope="scope">
              <span>{{scope.row.display_time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.describe')">
            <template slot-scope="scope">
              <span>{{scope.row.forecast}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div class="pagination-container">
          <PageTool :paginationPage="pagination.page" :paginationPagesize="pagination.pageSize" :total="pagination.total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
        </PageTool>
        </div>
        <!-- end -->
      </el-card>
     </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>

<style>
.el-table th {
  background-color: #fafafa;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8;
}
</style>
<script>
// import { list } from '@/api/base/logs'
import PageTool from './../components/page-tool'
import {list} from '@/api/example/table'
export default {
  name: 'base-logs',
  components: {
    PageTool
  },
  data() {
    return {
      dataList: [],
      tableKey: 0,
      total: null,
      listLoading: true,
      dialogStatus: '',
      alertText: '',
      pagination: {
        page: 1,
        // pagesize: 10
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      }
    }
  },
  computed: {},
  methods: {
    // 获取列表数据
    getList(page = 1, limit = 20) {
      this.listLoading = true
      // list(this.requestParameters)
      //   .then(data => {
      //     this.dataList = data.data.list
      //     this.total = data.data.counts
      //     this.alertText = `共 ${this.total} 条记录`
      //     this.listLoading = false
      //   })
      //   .catch(e => {
      //     this.$message.e('错了哦，这是一条错误消息')
      //   })
      this.pagination.currentPage = page
      this.pagination.pageSize = limit
      this.loading = true
      this.alertText = ''
      this.dataList = []
      list({page, limit})
        .then(res => {
          // console.log(res.data)
          this.dataList = res.data.items
          this.pagination.total = res.data.total
          this.alertText = `共 ${this.pagination.total} 条记录`
          this.loading = false
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
          this.loading = false
        })
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.pagination.pagesize = val
      if (this.pagination.page === 1) {
        this.getList(this.pagination)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getList()
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.getList()
  },
  // 组件更新
  updated: function() {}
}
</script>
