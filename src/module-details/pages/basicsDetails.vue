<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <div class="box border">
          <div class="title">
          <span>退款申请</span>
          </div>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
              <label>取货单号：</label>	1000000000
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
              <label>状态：</label>已取货
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>销售单号：</label>123456789
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>子订单：</label>123456789
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="box border">
          <div class="title">
          <span>用户信息</span>
          </div>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>用户姓名：</label>小编
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <label>联系电话：</label>15698789655
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>常用快递：</label>顺丰快递
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <label>取货地址：</label>北京市海淀区西三旗
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <label>备注：</label><span>暂无</span>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="box border">
          <div class="title">
          <span>退货商品</span>
          </div>
          <!-- 数据表格 -->
          <el-table 
            :data="items" 
            :summary-method="getSummaries"
            show-summary
            style="width: 100%; margin-top:10px;" 
            >

            <el-table-column prop="id" label="商品编号" width="200"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="barcode" label="商品条码" width="260"></el-table-column>
            <el-table-column prop="price" label="单价" width="120"></el-table-column>
            <el-table-column prop="number" label="数量（件）" width="160"></el-table-column>
            <el-table-column prop="moneyall" label="金额" width="160"></el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
            </el-table-column>
          </el-table>
          <el-pagination 
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
          <!-- 数据表格 / -->
        </div>
        <div class="box border">
          <div class="title">
          <span>退货商品</span>
          </div>
          <!-- 数据表格 -->
          <el-table 
            :data="items" 
            style="width: 100%; margin-top:10px;" 
            >

            <el-table-column prop="display_time" label="时间" width="260"></el-table-column>
            <el-table-column prop="step" label="当前进度"></el-table-column>
            <el-table-column label="状态" width="260">
              <template slot-scope="scope">
                
                <i class="icon iconBlue" v-if="scope.row.status==='进行中'"></i>
                <i class="icon iconGreen" v-if="scope.row.status==='成功'"></i>
                <i class="icon iconRed" v-if="scope.row.status==='失败'"></i>
                <span style="margin-left: 10px">{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nameId" label="操作员ID" width="260"></el-table-column>
            <el-table-column prop="time" label="耗时" width="260"></el-table-column>
          </el-table>
          <el-pagination 
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
          <!-- 数据表格 / -->
        </div>
      </el-card>
    </div>
    
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
      loading: false
    }
  },
  computed: {},
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
          this.items = res.data.items
          this.pagination.total = res.data.total
          this.barSearch.alertText = `共 ${this.pagination.total} 条记录`
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      let values = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        data.map(item => {
          item.moneyall = Number(item.number * item.price)
        })
        if (index === 4 || index === 5) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ''
          } else {
            sums[index] = '--'
          }
        }
      })

      return sums
    },
    // 删除
    handleDelete: function(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.items.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // UI方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.doQuery(1, val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.doQuery(val, this.pagination.pageSize)
    }
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
}
.box label {
  font-weight: normal;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}

.title {
  margin-bottom: 20px;
}
.border {
  border-bottom: 1px solid rgb(232, 232, 232);
  padding: 0 0 30px 0;
  margin: 0 0 30px 0;
}

</style>
