<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never" v-loading="loading">
        <!-- 搜索栏 -->
        <el-form :inline="true" :model="formSearch" size="small">
          <el-form-item label="审批人">
            <el-input v-model="formSearch.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formSearch.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" v-if="barSearch.expandInputs">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="formSearch.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formSearch.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" v-if="barSearch.expandInputs">
            <el-switch v-model="formSearch.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动状态" v-if="barSearch.expandInputs">
            <el-select v-model="formSearch.state" placeholder="活动状态">
              <el-option label="开启" value="1"></el-option>
              <el-option label="关闭" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleRest">重置</el-button>
            <el-button type="text" @click="handleExpand">{{barSearch.expandBtnText}}</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" size="small">新建</el-button>
        <el-alert v-if="barSearch.alertText !== ''" :title="barSearch.alertText" type="info" class="alert" :closable='false' show-icon></el-alert>
        <!-- 搜索栏 / -->
        <!-- 数据表格 -->
        <el-table class="tableL-container" v-if="tableItems.length > 0" :data="tableItems" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="title" label="标题" ></el-table-column>
          <el-table-column prop="type" label="类型" width="60"></el-table-column>
          <el-table-column prop="author" label="作者" width="80"></el-table-column>
          <el-table-column prop="reviewer" label="审核" width="80"></el-table-column>
          <el-table-column prop="pageviews" label="浏览" width="80"></el-table-column>
          <el-table-column prop="display_time" label="日期" width="160"></el-table-column>
        </el-table>
        <el-pagination v-if="tableItems.length > 0" class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 数据表格 / -->
      </el-card>
    </div>
  </div>
</template>

<script>
import {list} from '@/api/example/table'

export default {
  name: 'tableList',
  data() {
    return {
      formSearch: {
        user: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        state: ''
      },
      barSearch: {
        expandInputs: false,
        expandBtnText: '',
        alertText: ''
      },
      tableItems: [],
      total: 0,
      pageSize: 20,
      pageSizes: [20, 50, 80, 120],
      loading: false,
      multipleSelection: [],
      currentPage: 1
    }
  },
  methods: {
    // 业务方法
    doQuery() {
      this.loading = true
      this.barSearch.alertText = ''
      this.tableItems = []
      list({})
        .then(res => {
          console.log(res.data)
          this.tableItems = res.data.items
          this.total = res.data.total
          this.barSearch.alertText = `共 ${this.total} 条记录`
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // UI方法
    handleRest() {
      this.formSearch = {
        user: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        state: ''
      }
    },
    handleExpand() {
      this.barSearch.expandInputs = !this.barSearch.expandInputs
      this.barSearch.expandBtnText = this.barSearch.expandInputs
        ? '收起▲'
        : '展开▼'
    },
    handleSearch() {
      this.doQuery()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val, this.multipleSelection)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
  created() {
    this.barSearch.expandInputs = false
    this.barSearch.expandBtnText = '展开▼'
  }
}
</script>

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
  border-bottom: 1px solid #e8e8e8;
}
.el-table th.is-leaf {
  border-bottom: 2px solid #e8e8e8 !important;
}
</style>
