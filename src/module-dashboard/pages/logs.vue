<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- 数据 -->
        <el-table :key='tableKey' :data="dataList" v-loading="listLoading"  element-loading-text="给我一点时间" fit highlight-current-row
        style="width: 100%" border>
          <el-table-column align="center" :label="$t('table.operationType')">
            <template slot-scope="scope">
              <span>{{scope.row.operation_type}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operator')">
            <template slot-scope="scope">
              <span>{{scope.row.user_name}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.results')">
            <template slot-scope="scope">
              <span>{{scope.row.operation_result}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operationDate')">
            <template slot-scope="scope">
              <span>{{scope.row.operation_date}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.describe')">
            <template slot-scope="scope">
              <span>{{scope.row.operation_desc}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- end -->
        <!-- 分页 -->
        <div class="pagination-container">
          <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
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
import { list } from '@/api/base/logs'
import PageTool from './../components/pageTool'
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
      requestParameters: {
        page: 1,
        pagesize: 10
      }
    }
  },
  computed: {},
  methods: {
    // 获取列表数据
    getList(params) {
      this.listLoading = true
      list(this.requestParameters)
        .then(data => {
          this.dataList = data.data.list
          this.total = data.data.counts
          this.alertText = `共 ${this.total} 条记录`
          this.listLoading = false
        })
        .catch(e => {
          this.$message.e('错了哦，这是一条错误消息')
        })
    },
    // 每页显示信息条数
    handleSizeChange(val) {
      this.requestParameters.pagesize = val
      if (this.requestParameters.page === 1) {
        this.getList(this.requestParameters)
      }
    },
    // 进入某一页
    handleCurrentChange(val) {
      this.requestParameters.page = val
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
