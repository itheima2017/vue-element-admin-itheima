<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
       <!-- 搜索 -->
       <el-form :model="requestParameters" ref="requestParameters">
          <div class="filter-container">
            <el-form-item>
              <el-input @keyup.enter="handleFilter" style="width: 200px;" :placeholder="$t('table.search')" class="filter-item" v-model="requestParameters.username">
              </el-input>
              <el-button class="filter-item" size="small" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
              <el-button class="filter-item" size="small" type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
              <el-button class="filter-item fr" size="small" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.addUser')}}</el-button>
          </div>
        </el-form>
        <el-alert v-if="alertText !== ''" :title="alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- end -->
        <!-- 数据 -->
        <el-table :key='tableKey' :data="dataList" :row-class-name="rowClassStatus" v-loading="listLoading"  element-loading-text="给我一点时间" fit highlight-current-row
        style="width: 100%" border>
          <el-table-column align="center" :label="$t('table.id')">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('table.email')">
            <template slot-scope="scope">
              <span>{{scope.row.email}}</span>
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
            <template slot-scope="scope" v-show="deletedDate">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">{{$t('table.edit')}}</el-button>
              <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="removeUser(scope.row.id)">{{$t('table.delete')}}
              </el-button>
            </template>
            <!-- <template slot-scope="scope" v-show="showDate">
              <el-button type="primary" size="mini">{{$t('table.edit')}}</el-button>
              <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger">{{$t('table.delete')}}
              </el-button>
            </template> -->
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
        <component v-bind:is="UserAdd"
            ref="editUser" 
            :formData.sync='requestParameters'
            :text='text'
            :pageTitle='pageTitle'
            :formBase='formData'
            :ruleInline='ruleInline'
            :PermissionGroupsList='PermissionGroupsList'
            v-on:newDataes="handleLoadDataList" 
            v-on:handleCloseModal="handleCloseModal">
        </component>
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
/* .el-form-item {
  margin-bottom: 0;
} */
.disabled td {
  background-color: #f9f9f9;
  color: #c1c1c1;
}
.disabled .el-button--primary,
.disabled .el-button--danger {
  background-color: #dbdada;
  border: 1px solid #dbdada;
  color: #999;
   cursor:not-allowed;
}
</style>
<script>
import { simple } from '@/api/base/permissions'
import { list, remove, detail, update, add } from '@/api/base/users'
import PageTool from './../components/page-tool'
import UserAdd from './../components/user-add'
export default {
  name: 'base-users',
  components: {
    UserAdd,
    PageTool
  },
  data() {
    return {
      UserAdd: 'userAdd',
      pageTitle: '用户', // 页面标题
      text: '', // 新增、编辑文本
      tableKey: 0,
      deletedDate: false,
      showDate: true,
      dataList: [],
      PermissionGroupsList: [], // 权限组加载
      total: null,
      listLoading: true,
      dialogStatus: '',
      alertText: '',
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
        permission_group_title: '',
        avatar: '',
        introduction: ''
      },
      ruleInline: {
        // 表单验证
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        permission_group_id: [
          {
            type: 'number',
            required: true,
            message: '权限组名称不能为空',
            trigger: 'blur'
          }
        ]
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
    // 权限列表
    setupData() {
      simple().then(data => {
        this.PermissionGroupsList = data.data
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
      if (row.row.is_deleted === 1) {
        this.deletedDate = true
        this.showDate = false
        return 'disabled'
      } else {
        return ''
      }
    },
    // **********************************
    // 搜索的项目
    query() {
      this.formData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        permission_group_id: '',
        avatar: '',
        introduction: ''
      }
    },
    // 新增用户
    handleCreate() {
      this.query()
      this.text = '创建'
      this.$refs.editUser.dialogFormV()
      this.setupData()
    },
    // 窗口操作**********************************
    // 弹框关闭
    handleCloseModal() {
      this.$refs.editUser.dialogFormH()
    },
    // 编辑
    // 表单详情数据加载
    hanldeEditForm(objeditId) {
      this.formData.id = objeditId
      this.setupData()
      detail({ id: objeditId }).then((data, err) => {
        var datalist = data.data
        if (err) {
          return err
        }
        this.formData.id = datalist.id
        this.formData.email = datalist.email
        this.formData.phone = datalist.phone
        this.formData.username = datalist.username
        this.formData.password = datalist.password
        this.formData.avatar = datalist.avatar
        this.formData.introduction = datalist.introduction
        this.formData.permission_group_id = datalist.permission_group_id
        this.formData.permission_group_title = datalist.permission_group_title
      })
    },
    handleUpdate(objeditId) {
      this.query()
      var _this = this
      this.text = '编辑'
      this.$refs.editUser.dialogFormV()
      _this.hanldeEditForm(objeditId)
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
