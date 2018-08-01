<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <div class="orderDetail">
          <h2><i class="el-icon-tickets"></i>单号：234231029431</h2>
          <div class="orderCon">
            <el-row>
              <el-col :span="20">
                <el-row>
                  <el-col :span="12">
                    <label>创建人：</label>李三
                  </el-col>
                  <el-col :span="12">
                    <label>订购产品：</label>产品xx
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <label>创建时间：</label>2018-8-8
                  </el-col>
                  <el-col :span="12">
                    <label>关联单据：</label>123456
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <label>生效日期：</label>2018-07-07 ~ 2018-08-08
                  </el-col>
                  <el-col :span="12">
                    <label>备注：</label>请于7个工作日内确认
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="4" class="statusInfo">
                <el-row>
                  <el-col :span="12">
                    <p>状态</p>
                    <p class="fontSize">待审批</p>
                  </el-col>
                  <el-col :span="12">
                    <p>订单金额</p>
                    <p class="fontSize">¥ 568.08</p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>流程进度</span>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>用户信息</span>
        </div>
        <div class="box">
          <div class="title">
          <span>用户姓名</span>
          </div>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
              <label>用户姓名：</label>xxx
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
              <label>会员卡号：</label>410258963525458965
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>身份证：</label>415898745869869852
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>联系方式：</label>15236987456
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple-light">
                <label>联系地址：</label>北京市海淀区西三旗
              </div>
              </el-col>
          </el-row>
        </div>
        <div class="box">
          <div class="title">
          <span>信息组</span>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
              <label>数据1：</label>xxx
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
               <label>该数据更新时间：</label>2018-8-8
              </div>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <label>数据2：</label>xxx
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <label>该数据更新时间：</label>2018-8-8
              </div>
              </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>用户近半年来电记录</span>
        </div>
        <div class="box">
          <p class="conCenter">暂无数据</p>
        </div>
      </el-card>
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="日志1" name="first">
            <el-table 
            :data="items" 
            style="width: 100%; margin-top:10px;" 
            >

            <el-table-column prop="type" label="类型" width="260"></el-table-column>
              <el-table-column prop="author" label="操作员"></el-table-column>
              <el-table-column label="执行结果" width="260">
                <template slot-scope="scope">
                  
                  <i class="icon iconBlue" v-if="scope.row.status==='进行中'"></i>
                  <i class="icon iconGreen" v-if="scope.row.status==='成功'"></i>
                  <i class="icon iconRed" v-if="scope.row.status==='失败'"></i>
                  <span style="margin-left: 10px">{{ scope.row.status }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="display_time" label="操作时间" width="260"></el-table-column>
              <el-table-column prop="remarks" label="备注" width="260"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="日志2" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="日志3" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="日志4" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹出窗 -->
    <!-- 弹出窗 / -->
  </div>
</template>

<script>
import {list} from '@/api/example/detail'
export default {
  name: 'DetailItem',
  data() {
    return {
      barSearch: {
        expandInputs: false,
        expandBtnText: '',
        alertText: ''
      },
      items: [],
      pagination: {
        total: 0,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80, 100],
        currentPage: 1
      },
      loading: false,
      activeName: 'first'
    }
  },
  methods: {
    // 业务方法
    doQuery(page = 1, limit = 10) {
      this.pagination.currentPage = page
      this.pagination.pageSize = limit
      this.loading = true
      this.barSearch.alertText = ''
      this.items = []
      list({page, limit})
        .then(res => {
          console.log(res.data)
          this.items = res.data.items
          this.pagination.total = res.data.total
          this.barSearch.alertText = `共 ${this.pagination.total} 条记录`
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
    // UI方法
  },
  created() {
    this.doQuery()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.el-row {
  font-size: 14px;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  label {
  font-weight: normal;
}
}
.box{padding-bottom: 25px;}
.orderCon{padding-left: 35px;}
.el-icon-tickets:before{color: #1890ff; margin-right: 10px;}
.statusInfo{text-align: right;}
.statusInfo p{margin: 0 0 10px;}
.fontSize{font-size: 20px;}
.title {
  margin-bottom: 20px;
}
.conCenter{text-align: center;color: #ccc;}
.el-card{margin-bottom: 15px;}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}

</style>
