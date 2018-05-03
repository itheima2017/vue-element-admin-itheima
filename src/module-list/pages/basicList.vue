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
          <el-button slot="append" icon="el-icon-search" @click="doQuery(1, 20)"></el-button>
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
        <el-form ref="barSearch" label-position="left" :model="barSearch" label-width="80px">
          <el-form-item label="类型:" :class="['row', 'auto-hidden', { 'expand': barSearch.expandInputs }]">
            <el-row>
              <el-col :span="2">
                <el-checkbox :indeterminate="barSearch.isIndeterminate"  v-model="barSearch.checkedTypesAll" @change="handlecheckedTypesAllChange">全选</el-checkbox>
              </el-col>
              <el-col :span="20">
                <el-checkbox-group v-model="barSearch.checkedTypes" @change="handleCheckedTypesChange" >
                  <el-checkbox v-for="item in barSearch.typesList" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="handleExpand">{{barSearch.expandBtnText}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="点心:" class="row">
            <el-select v-model="barSearch.selOption" style="margin-bottom:16px;" allow-create filterable multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其它:" class="row">
            <el-row>
              <el-col :span="12">
                <el-form-item label="活动区域">
                  <el-select v-model="barSearch.region" placeholder="选择" style="margin-bottom:16px;">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="好评度">
                  <el-select v-model="barSearch.goods" placeholder="选择" style="margin-bottom:16px;">
                    <el-option label="优秀" value="good"></el-option>
                    <el-option label="一般" value="general"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 筛选框 / -->
      <!-- 数据列表 -->
      <el-card shadow="never" class="basic-list-content">
        <!-- 数据项 -->
        <div class="item" v-for="(item, index) in items" :key="'item-'+index">
          <h4>{{item.title}}</h4>
          <div>
            <el-tag class="tag" v-for="(tag, ix) in item.tags" :key="'tag'+ix">{{tag}}</el-tag>
          </div>
          <p>
            {{item.description}}
          </p>
          <div>
            <img :src="`http://or45inefq.bkt.clouddn.com/${item.icon}.png`" class="image">
            {{item.author}} 发布在 <a href="" target="_blank">{{item.url}}</a> {{item.displayTime}}
          </div>
          <div>
            <el-button icon="el-icon-star-off" type="text">{{item.stars}}</el-button>
            <el-button icon="el-icon-view" type="text">{{item.likes}}</el-button>
            <el-button icon="el-icon-message" type="text">{{item.messages}}</el-button>
          </div>
        </div>
        <!-- 更多按钮 -->
        <div class="btnMore">
          <el-button v-loading="moreLoading" @click="handleLoadMore">加载更多</el-button>
        </div>
      </el-card>
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
        isIndeterminate: false,
        selOption: '',
        region: '',
        goods: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      items: [],
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      loading: false,
      moreLoading: false
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
      this.barSearch.checkedTypesAll =
        checkedCount === this.barSearch.checkedTypes.length
      this.barSearch.isIndeterminate =
        checkedCount > 0 && checkedCount < types.length
    },
    handleLoadMore() {
      this.pagination.currentPage++
      this.pagination.pageSize = 20
      this.moreLoading = true
      list(
        {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize
        })
        .then(res => {
          console.log(res.data)
          this.items = this.items.concat(res.data.items)
          this.pagination.total = res.data.total
          this.moreLoading = false
        })
        .catch(err => {
          console.log(err)
          this.moreLoading = false
        })
    }
  },
  created() {
    this.barSearch.expandInputs = false
    this.barSearch.expandBtnText = '展开▼'
    this.doQuery()
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
  .row {
    border-bottom: 1px dashed #e8e8e8;
    &.auto-hidden {
      max-height: 50px;
      overflow: hidden;
    }
    &.expand {
      max-height: 82px;
    }
    &:last-child {
      border: none;
      margin: 0px;
      padding: 0px;
    }
  }
}
.basic-list-content {
  margin-top: 20px;
  .item {
    border-bottom: 1px solid #e8e8e8;
    a {
      color: #1890ff;
    }
    &:last-child {
      border: none;
    }
  }
  .image {
    width: 16px;
    height: 16px;
    border-radius: 48px;
  }
  .tag {
    margin-right: 5px;
  }
  .btnMore {
    margin: 20px 0px;
    text-align: center;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
