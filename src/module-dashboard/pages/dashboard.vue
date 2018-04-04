<template>
  <div class="dashboard-container">
    <el-row :gutter="20" >
      <el-col :span="6">
        <el-card class="box-card" :body-style="{ padding: '5px 20px' , minHeight: '230px' }">
          <div class="header">
            <span>总销售额</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="total">
            ¥ 126,560
          </div>
          <div class="trends">
            <span>周同比 12% <i class="el-icon-caret-top"></i></span>
            <span>日环比 11% <i class="el-icon-caret-bottom"></i></span>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>日均销售额</span> <span>￥12,423</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" :body-style="{ padding: '5px 20px' , minHeight: '230px' }">
          <div class="header">
            <span>访问量</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <raddar-chart></raddar-chart>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>日访问量</span> <span>1,234</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" :body-style="{ padding: '5px 20px' , minHeight: '230px' }">
          <div class="header">
            <span>支付笔数</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <pie-chart></pie-chart>
          </div>
          <div class="hr"></div>
          <div class="footer">
            <span>转化率</span> <span>1,234</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" :body-style="{ padding: '5px 20px' , minHeight: '230px' }">
          <div class="header">
            <span>运营活动效果</span>
            <el-tooltip class="item" effect="dark" content="指标说明" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </div>
          <div class="chart">
            <bar-chart></bar-chart>
          </div>
          <div class="hr"></div>
          <div class="trends">
            <span>周同比 12% <i class="el-icon-caret-top"></i></span>
            <span>日环比 11% <i class="el-icon-caret-bottom"></i></span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {hasPermissionPoint} from '@/utils/permission'
import LineChart from './../components/LineChart'
import RaddarChart from './../components/RaddarChart'
import PieChart from './../components/PieChart'
import BarChart from './../components/BarChart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard',
  components: {
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  },
  computed: {},
  created() {
    // 权限点检查
    let hasList = hasPermissionPoint('base-users-list')
    console.log(hasList)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  margin: 10px;
}
.box-card {
  padding: 5px 10px;
  .header {
    height: 25px;
    span {
      color: #97a8be;
      font-size: 14px;
    }
    .item {
      color: #97a8be;
      float: right;
      padding: 3px 0;
    }
  }
  // 总销售额
  .total {
    font-size: 30px;
    height: 140px;
    line-height: 100px;
  }
  .trends {
    height: 22px;
    font-size: 14px;
    span {
      display: inline;
      i {
        color: red;
      }
    }
    span:last-child {
      margin-left: 20px;
      display: inline;
      i {
        color: green;
      }
    }
  }
  .chart {
    height: 160px;
  }
  .hr {
    border-top: 1px solid #e8e8e8;
    margin: 0px 0px 10px 0px;
  }
  .footer {
    span {
      font-size: 14px;
      line-height: 22px;
    }
    span:last-child {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  // 总销售额 end
}
</style>
