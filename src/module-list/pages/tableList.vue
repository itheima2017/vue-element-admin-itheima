<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
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
      </el-card>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/example/table'

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
      tableItems: []
    }
  },
  methods: {
    // 业务方法
    doQuery() {
      this.barSearch.alertText = ''
      list({}).then(res => {
        console.log(res.data)
        this.tableItems = res.data.items
        this.barSearch.alertText = `共 ${res.data.total} 条记录`
      }).catch(err => {
        console.log(err)
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
      this.barSearch.expandBtnText = this.barSearch.expandInputs ? '收起▲' : '展开▼'
    },
    handleSearch() {
      this.doQuery()
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
</style>
