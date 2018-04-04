<template>
  <div class="dashboard-container">
     <div class="app-container calendar-list-container">
       <!-- 搜索 -->
       <el-form :model="requestParameters" ref="requestParameters" label-width="100px" class="demo-dynamic">
        <div class="filter-container">
          <el-form-item prop="username">
            <el-input @keyup.enter="handleFilter" style="width: 200px;" :placeholder="$t('table.search')" class="filter-item" v-model="requestParameters.username">
            </el-input>
            <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
            <el-button class="filter-item" size="small" type="primary" @click="resetForm">重置</el-button>
          </el-form-item>
            <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.addUser')}}</el-button>
        </div>
       </el-form>
       <!-- end -->
       <!-- 数据 -->
       <el-table :key='tableKey' :data="dataList" :row-class-name="rowClassStatus" v-loading="listLoading"  element-loading-text="给我一点时间" fit highlight-current-row
      style="width: 100%">
        <el-table-column align="center" :label="$t('table.id')">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.email')">
          <template slot-scope="scope">
            <span>{{scope.row.email | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.phone')">
          <template slot-scope="scope">
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.username')">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.permissionUser')">
          <template slot-scope="scope">
            <span>{{scope.row.permission_group_title}}</span>
          </template>
        </el-table-column>
        <!-- 头像 -->
        <!-- <el-table-column align="center" :label="$t('table.avatar')">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:50px;height:50px;">
          </template>
        </el-table-column> -->
        <el-table-column align="center" width="350px" :label="$t('table.introduction')">
          <template slot-scope="scope">
            <span>{{scope.row.introduction}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.actions')" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">{{$t('table.edit')}}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="removeUser(scope.row.id)">{{$t('table.delete')}}
            </el-button>
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
      <!-- 新增标签弹层 -->
      <component v-bind:is="userAdd"
          ref="editUser" 
          :formData.sync='requestParameters'
          :text='text'
          :page_title='page_title'
          :dialogFormV='dialogFormVisible'
          v-on:newDataes="handleLoadDataList" 
          v-on:handleCloseModal="handleCloseModal">
      </component>
     </div>
  </div>
</template>
<style>
.el-table th{
     background:#f4f4f4 !important;
}
.el-table th{
  color: #606266
}
.disabled .el-button--primary,.disabled td .el-button--danger{
    pointer-events: none;
    cursor: not-allowed;
}
.disabled td {
    background-color: #f9f9f9;
    color: #c1c1c1;
}
.disabled td .el-button--primary ,.disabled td .el-button--danger{
  background-color:#e7e7e7;
  border: 0 none;
  color: #bababa;
  cursor: not-allowed;
}
</style>
<script>
import { list, remove } from '@/api/base/users'
import PageTool from './../components/pageTool'
import userAdd from './../components/userAdd'
export default {
  name: 'base-users',
  components: {
    userAdd,
    PageTool
  },
  data() {
    return {
      userAdd: 'userAdd',
      page_title: '用户', // 页面标题
      text: '', // 新增、编辑文本
      tableKey: 0,
      dataList: [],
      total: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      requestParameters: {
        page: 1,
        pagesize: 10,
        username: this.username
      },
      formData: {
        email: '',
        phone: '',
        username: '',
        password: '',
        permission_group_id: '',
        avatar: '',
        introduction: ''
      }
    }
  },
  computed: {
  },
  methods: {
    // 获取列表数据
    getList(params) {
      this.listLoading = true
      list(this.requestParameters).then(data => {
        this.dataList = data.data.list
        this.total = data.data.counts
        this.listLoading = false
      }).catch(e => {
        this.$message.e('错了哦，这是一条错误消息')
      })
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
    // 数据删除后显示样式
    rowClassStatus(row) {
      // console.log(row.row.is_deleted)
      if (row.row.is_deleted === 1) {
        return 'disabled'
      } else {
        return ''
      }
    },
    // **********************************
    // 搜索的项目 
    query () {
      this.formData.email = ''
      this.formData.phone = ''
      this.formData.username = ''
      this.formData.password = ''
      this.formData.permission_group_id = ''
      this.formData.avatar = ''
      this.formData.introduction = '' 
    },
    // 新增用户
    handleCreate() {
      // this.query()
      this.text = '创建'
      this.dialogFormVisible = true
    },
    // 窗口操作**********************************
    // 弹框关闭
    handleCloseModal() {
      this.dialogFormVisible = false
    },
    // 编辑
    handleUpdate(objeditId) {
      var _this = this
      this.text = '编辑'
      this.dialogFormVisible = true
      _this.$refs.editUser.hanldeEditForm(objeditId)
    },
    // 删除
    removeUser(user) {
        this.$confirm('此操作将永久删除用户 ' + ', 是否继续?', '提示', { type: 'warning' }) 
            .then(() => { 
                remove({'id': user}).then(response => { 
                        this.$message.success('成功删除了用户' + '!')
                        this.dataList.splice(user, 1)
                        this.getList(this.requestParameters)
                        }) 
                    .catch(response => { 
                        this.$message.error('删除失败!') 
                })
            }).catch(() => { 
                this.$message.info('已取消操作!')
        }) 
    }
  },
  // 挂载结束
  mounted: function() {
  },
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
  updated: function() {
  }
}
</script>
