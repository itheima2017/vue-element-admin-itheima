<template>
  <div class="dashboard-container" v-loading="loading">
    <!-- 搜索框 -->
    <el-card shadow="never" class="basic-list-query">
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
    <!-- 搜索框 / -->
    <div class="app-container">
      <!-- 筛选框 -->
      <el-card shadow="never" class="basic-list-bar">
        <el-form ref="barSearch" label-position="left" :model="barSearch" label-width="50px">
          <el-form-item label="类型:" class="item">
            <el-checkbox class="left marginr30"
              :indeterminate="barSearch.isIndeterminate" 
              v-model="barSearch.checkedTypesAll" 
              @change="handlecheckedTypesAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="barSearch.checkedTypes" @change="handleCheckedTypesChange">
              <el-checkbox class="left" v-for="item in barSearch.typesList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
            <el-button class="btnExpand" type="text" @click="handleExpand">{{barSearch.expandBtnText}}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 筛选框 / -->
      <!-- 数据列表 -->
      <!-- 数据列表 / -->
    </div>
  </div>
</template>

<script>
import {list, types} from '@/api/example/articles'

export default {
  name: 'basic-list',
  data() {
    return {
      barSearch: {
        keyword: '',
        activeName: 'first',
        selectKind: '1',
        expandInputs: false,
        expandBtnText: '',
        typesList: types,
        checkedTypesAll: false,
        checkedTypes: [],
        isIndeterminate: false
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
    },
    handlecheckedTypesAllChange(val) {
      this.barSearch.checkedTypes = val ? types : []
      this.barSearch.isIndeterminate = false
    },
    handleCheckedTypesChange(value) {
      let checkedCount = value.length
      this.barSearch.checkedTypesAll = checkedCount === this.barSearch.checkedTypes.length
      this.barSearch.isIndeterminate =
        checkedCount > 0 && checkedCount < types.length
    }
  },
  created() {
    this.barSearch.expandInputs = false
    this.barSearch.expandBtnText = '展开▼'
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 搜索栏
.basic-list-query {
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
// 筛选栏位
.basic-list-bar {
  .el-checkbox__input {
    display: none;
  }
  .el-checkbox__label {
    padding-left: 0px;
  }
  .item {
    display: block;
    border-bottom: 1px dashed #e8e8e8;
    .btnExpand {
      display: left;
      margin-left: 50px;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.left {
  float: left;
}
.marginr30 {
  margin-right: 30px;
}
</style>
