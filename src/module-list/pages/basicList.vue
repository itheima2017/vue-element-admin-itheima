<template>
  <div class="dashboard-container basic-list" v-loading="loading">
    <el-card shadow="never">
      <div class="search">
        <el-input placeholder="请输入内容" v-model="barSearch.keyword" class="input-with-select">
          <el-select v-model="barSearch.selectKind" slot="prepend" placeholder="请选择">
            <el-option label="标题" value="1"></el-option>
            <el-option label="描述" value="2"></el-option>
            <el-option label="网址" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-tabs v-model="barSearch.activeName" @tab-click="handleTabName">
        <el-tab-pane label="文章" name="first"></el-tab-pane>
        <el-tab-pane label="应用" name="second"></el-tab-pane>
        <el-tab-pane label="项目" name="third"></el-tab-pane>
      </el-tabs>
    </el-card>
    <div class="app-container">
      <el-card shadow="never">
      </el-card>
    </div>
  </div>
</template>

<script>
import {list} from '@/api/example/articles'

export default {
  name: 'basic-list',
  data() {
    return {
      barSearch: {
        keyword: '',
        activeName: 'first',
        selectKind: '1',
        expandInputs: false,
        expandBtnText: ''
      },
      items: [],
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: false
    }
  },
  methods: {
    // 业务方法
    doQuery(page = 1, limit = 20) {
      this.pagination.currentPage = page
      this.pagination.pageSize = limit
      this.loading = true
      this.items = []
      list({page, limit})
        .then(res => {
          console.log(res.data)
          this.items = res.data.items
          this.pagination.total = res.data.total
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // UI方法
    handleExpand() {
      this.barSearch.expandInputs = !this.barSearch.expandInputs
      this.barSearch.expandBtnText = this.barSearch.expandInputs
        ? '收起▲'
        : '展开▼'
    },
    handleSearch() {
      this.doQuery()
    },
    handleTabName(tab, event) {
      console.log(tab, event)
    }
  },
  created() {
    this.barSearch.expandInputs = false
    this.barSearch.expandBtnText = '展开▼'
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.basic-list {
  .el-card__body {
    padding: 20px 20px 0px 20px;
  }
  .el-tabs__header {
    margin: 0px;
  }
  .el-tabs__active-bar {
    height: 3px;
  }
  .search {
    text-align: center;
    .el-select .el-input {
      width: 130px;
    }
    .input-with-select {
      width: 50%;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
