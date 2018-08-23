<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
       <!-- 搜索 -->
       <el-form :model="requestParameters" ref="requestParameters">
          <el-form-item prop="title">
            <el-input @keyup.enter="handleFilter" style="width: 200px;" :placeholder="$t('table.search')" class="filter-item" v-model="requestParameters.title">
            </el-input>
            <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
            <el-button class="filter-item" size="small" type="primary" @click="resetForm">重置</el-button>
          </el-form-item>
            <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.permissionNew')}}</el-button>
       </el-form>
       <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
       <!-- end -->
       <!-- 数据 -->
       <el-table :key='tableKey' :data="dataList" v-loading="listLoading"  element-loading-text="给我一点时间" fit highlight-current-row
      style="width: 100%" border>
        <el-table-column type="selection"  width="55">
        </el-table-column>
        <el-table-column align="center" :label="$t('table.username')">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.date')"
          :sort-method="changesort"
          sortable
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.create_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">{{$t('table.edit')}}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="removeUser(scope.row.id)">{{$t('table.delete')}}
            </el-button>
            <!-- 高级接口授权 -->
            <!-- <el-button size="mini" type="primary" @click="handleApiSet(scope.row.id)" style="width:auto">{{$t('table.imdsAi')}}
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- end -->
      <!-- 分页 -->
      <div class="pagination">
        <PageTool :paginationPage="requestParameters.page" :paginationPagesize="requestParameters.pagesize" :total="total" @pageChange="handleCurrentChange" @pageSizeChange="handleSizeChange">
      </PageTool>
      </div>
      <!-- end -->
      <!-- 新增标签弹层 -->
      <component v-bind:is="PermissionsAdd"
          ref="editPermission" 
          :formData.sync='requestParameters'
          :text='text'
          :pageTitle='pageTitle'

          :ruleInline='ruleInline'
          v-on:newDataes="handleLoadDataList" 
          v-on:handleCloseModal="handleCloseModal">
      </component>
      <!-- 高级接口权限弹层 -->
      <!-- <component v-bind:is="permissionsApiAdd"
          :apiTitle='apiTitle'
          ref="editPermissionApi" 
          :formData.sync='requestParameters'
          :ruleInline='ruleInline'
          v-on:handleCloseModal="handleCloseModal">
      </component> -->
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
  // text-align: right;
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
import { list, remove, detail, update, add } from '@/api/base/permissions'
import PageTool from './../components/page-tool'
import PermissionsAdd from './../components/permissions-add'
// import permissionsApiAdd from './../components/permissionsApi-add'
export default {
  name: 'base-permissions',
  components: {
    PermissionsAdd,
    // permissionsApiAdd,
    PageTool
  },
  data() {
    return {
      PermissionsAdd: 'PermissionsAdd',
      permissionsApiAdd: 'permissionsApiAdd',
      pageTitle: '权限组', // 页面标题
      text: '', // 新增、编辑文本
      apiTitle: '高级接口授权',
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      dialogStatus: '',
      alertText: '',
      requestParameters: {
        page: 1,
        pagesize: 10,
        title: this.title
      },
      // formBase: {
      //   id: 0,
      //   title: '',
      //   permissions: []
      // },
      // formData: {
      //   id: 0,
      //   create_date: '',
      //   title: '',
      //   permissions: []
      // },
      ruleInline: {
        // 表单验证
        title: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
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
    // 数据排序
    changesort(a, b) {
      let oldTime = new Date(a.date).getTime() / 1000
      let newime = new Date(b.date).getTime() / 1000
      if (oldTime - newime > 0) {
        return true
      } else {
        return false
      }
    },
    // 重置
    resetForm() {
      this.$refs['requestParameters'].resetFields()
    },
    // 搜索信息
    handleFilter() {
      this.requestParameters.page = 1
      this.getList(this.requestParameters)
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
    },
    // 新增用户刷新列表
    handleLoadDataList() {
      this.getList()
    },
    // **********************************
    // 新增用户
    handleCreate() {
      this.text = '创建'
      this.$refs.editPermission.handleResetForm()
      this.$refs.editPermission.dialogFormV()
    },
    // 窗口操作**********************************
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editPermission.dialogFormH()
    },
    // 编辑
    handleUpdate(objeditId) {
      var _this = this
      this.text = '编辑'
      this.$refs.editPermission.dialogFormV()
      this.$refs.editPermission.hanldeEditForm(objeditId)
    },
    // 删除
    removeUser(user) {
      this.$confirm('此操作将永久删除用户 ' + ', 是否继续?', '提示', {
        type: 'warning'
      })
        .then(() => {
          remove({ id: user })
            .then(response => {
              this.$message.success('成功删除了用户' + '!')
              this.dataList.splice(user, 1)
              this.getList(this.requestParameters)
            })
            .catch(response => {
              this.$message.error('删除失败!')
            })
        })
        .catch(() => {
          this.$message.info('已取消操作!')
        })
    },
    // 高级接口权限

    handleApiSet(objeditId) {
      this.$refs.editPermissionApi.dialogFormV()
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.getList()
    // 键盘enter操作
    var lett = this
    document.onkeydown = function(e) {
      var key = window.event.keyCode
      if (key === 13) {
        lett.handleFilter(this.requestParameters)
      }
    }
  },
  // 组件更新
  updated: function() {}
}
</script>
