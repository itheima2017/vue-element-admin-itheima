<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 仓库管理 -->
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <span>仓库管理</span>
        </div>
        <el-form ref="formDate" :model="formDate">
          <el-row type="flex" :gutter='50' class="row-bg">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="仓库名" prop="name">
                    <el-input v-model="formDate.name" placeholder="请输入..."></el-input>
                  </el-form-item>
              </div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <el-form-item label="仓库域名" prop="domainName">
                    <el-input placeholder="请输入内容" v-model="formDate.domainName">
                      <template slot="prepend">Http://</template>
                      <template slot="append">.com</template>
                    </el-input>
                  </el-form-item>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="仓库管理员" prop="userAdmin">
                    <template>
                      <el-select v-model="formDate.userAdmin" filterable placeholder="请选择管理员" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
              </div>
              </el-col>
          </el-row>
          <el-row type="flex" :gutter='50' class="row-bg">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="审批人" prop="eaaName">
                    <template>
                      <el-select v-model="formDate.eaaName" filterable placeholder="请选择管理员" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
              </div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <el-form-item label="生效日期" prop="formTime">
                    <el-date-picker style="width:100%"
                      v-model="formDate.formTime"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      range-separator='~'
                      :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                  </el-form-item>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="仓库类型" prop="warehouseType">
                    <template>
                      <el-select v-model="formDate.warehouseType" filterable placeholder="请选择管理员" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
              </div>
              </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 任务管理 -->
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <span>仓库管理</span>
        </div>
        <el-form ref="formDate" :model="formDate">
          <el-row type="flex" :gutter='50' class="row-bg">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="任务名" prop="taskName">
                    <el-input v-model="formDate.taskName" placeholder="请输入..."></el-input>
                  </el-form-item>
              </div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <el-form-item label="任务描述" prop="taskDese">
                    <el-input v-model="formDate.taskDese" placeholder="请输入内容">
                    </el-input>
                  </el-form-item>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="执行人" prop="impleMent">
                    <template>
                      <el-select v-model="formDate.impleMent" filterable placeholder="请选择执行人" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
              </div>
              </el-col>
          </el-row>
          <el-row type="flex" :gutter='50' class="row-bg">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="责任人" prop="person">
                    <template>
                      <el-select v-model="formDate.person" filterable placeholder="请选择责任人" style="width:100%">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
              </div></el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <el-form-item label="生效日期">
                    <el-time-select
                        placeholder="起始时间"
                        v-model="formDate.startTime"
                        :picker-options="{
                          start: '08:30',
                          step: '00:15',
                          end: '18:30'
                        }" style="width:100%">
                      </el-time-select>
                  </el-form-item>
              </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="任务类型" prop="taskType">
                    <template>
                      <el-select v-model="formDate.taskType" filterable placeholder="请选择管理员" style="width:100%">
                        <el-option
                          v-for="item in taskType"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-form-item>
              </div>
              </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 任务管理 -->
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <span>成员管理</span>
        </div>
        <div class="template-manage">
          <div class="temp-title">
            <el-button 
              size="small" 
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addTemp">新增成员</el-button>
          </div>
          <div class="temp-list">
            <el-table
              class="template-list"
              :data="tempList"
              style="width: 100%">
              <el-table-column
                label="成员姓名">
                <template slot-scope="scope">
                  <div v-if="!scope.row.editing">
                    <span>{{ scope.row.name }}</span>
                  </div>
                  <div v-else>
                    <el-input v-model="scope.row.name" placeholder="请填写姓名"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="工号">
                <template slot-scope="scope">
                  <div v-if="!scope.row.editing">
                    <span>{{ scope.row.pre }}</span>
                  </div>
                  <div v-else>
                    <el-input v-model="scope.row.pre" placeholder="请填写工号"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="所属部门">
                <template slot-scope="scope">
                  <div v-if="!scope.row.editing">
                    <span>{{ scope.row.next }}</span>
                  </div>
                  <div v-else>
                    <el-select v-model="scope.row.next" placeholder="请选择">
                      <el-option
                        v-for="item in TypeDate"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <div class="operate-groups">
                    <el-button
                      type="primary"
                      size="mini"
                      v-if="!scope.row.editing"
                      icon="el-icon-edit-outline"
                      @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      v-if="scope.row.editing"
                      icon="el-icon-success"
                      @click="handleSave(scope.$index, scope.row)">保存
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      v-if="!scope.row.editing"
                      icon="el-icon-delete"
                      @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button
                      size="mini"
                      type="warning"
                      v-if="scope.row.editing"
                      icon="el-icon-warning"
                      @click="handleCancel(scope.$index, scope.row)">取消
                    </el-button>
                    <div class="upAndDown">
                      <el-button 
                        plain 
                        class="up" 
                        type="primary" 
                        size="mini"
                        icon="el-icon-arrow-up"
                        @click="handleUp(scope.$index, scope.row)">
                      </el-button>
                      <el-button 
                        plain   
                        class="down" 
                        type="primary" 
                        size="mini" 
                        icon="el-icon-arrow-down"
                        @click="handleDown(scope.$index, scope.row)">
                      </el-button>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
  </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showradio: false,
      formDate: {
        name: '', // 仓库名
        userAdmin: '', // 仓库管理员
        domainName: '', // 仓库域名
        eaaName: '', // 审批人
        warehouseType: '', // 仓库类型
        formTime: [],
        taskName: '', // 任务名
        taskDese: '', // 任务描述
        impleMent: '', // 执行人
        person: '', // 责任人
        startTime: '',
        endTime: '', //
        taskType: '' // 任务类型
      },
      options: [
        {
          name: '吴雪'
        },
        {
          name: '常双'
        },
        {
          name: '李小刚'
        }
      ],
      taskType: [
        {
          name: '私密'
        },
        {
          name: '公开'
        }
      ],
      tempList: [],
      TypeDate: [
        {
          id: '1',
          name: '人事'
        },
        {
          id: '2',
          name: '行政'
        },
        {
          id: '3',
          name: '研究院'
        },
        {
          id: '4',
          name: '综合部门'
        }
      ]
    }
  },
  computed: {},
  methods: {
    // 上下自由调整表格数据
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
      return arr
    },
    handleUp($index, row) {
      if ($index === 0) {
        return
      }
      this.swapItems(this.tempList, $index, $index - 1)
    },
    handleDown($index, row) {
      if ($index === this.tempList.length - 1) {
        return
      }
      this.swapItems(this.tempList, $index, $index + 1)
    },
    // 编辑
    handleEdit($index, row) {
      this.$set(this.tempList[$index], 'editing', true)
      // console.log(this.tempList)
    },
    // 保存
    handleSave($index, row) {
      // console.log(this.tempList)
      if (row.name === '') {
        this.$message.error('请填写姓名')
        return false
      } else if (row.pre === '') {
        this.$message.error('请填写工号')
        return false
      }
      if (row.next === '') {
        this.$message.error('请填写部门')
        return false
      }
      this.$set(this.tempList[$index], 'editing', false)
      localStorage.setItem('tempList', JSON.stringify(this.tempList))
    },
    // 取消
    handleCancel($index, row) {
      this.$set(this.tempList[$index], 'editing', false)
    },
    // 新增一条模板数据
    addTemp() {
      this.tempList = this.tempList || []
      this.tempList.push({
        name: '',
        pre: '',
        next: '',
        editing: true
      })
    },
    // 删除
    handleDelete($index, row) {
      this.$confirm('此操作将永久删除该条模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tempList.splice($index, 1)
          localStorage.setItem('tempList', JSON.stringify(this.tempList))
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    this.tempList = JSON.parse(localStorage.getItem('tempList'))
  },
  // 组件更新
  updated: function() {}
}
</script>
<style>
.el-form-item--medium .el-form-item__fnone{
  float: none;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item--medium .el-form-item__label{
  float: none !important;
}
.el-card {
  margin-bottom: 15px;
}
.template-manage {
  .temp-title {
    display: flex;
    justify-content: space-between;
    height: 30px;
    // margin-top: 20px;
  }
  .el-table {
    background-color: #f7f7f7;
    margin-top: 20px;
    th > .cell {
      text-align: center !important;
    }
  }
  .operate-groups {
    display: flex;
    justify-content: flex-start;
    .upAndDown {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .el-button--mini {
        padding: 0;
        width: 30px;
        margin-left: 0;
      }
      .down {
        margin-top: 2px;
      }
    }
  }
}
</style>
