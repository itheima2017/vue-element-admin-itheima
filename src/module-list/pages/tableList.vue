<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-form :inline="true" :model="formInline" size="small">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" v-if="expandInputs">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" v-if="expandInputs">
            <el-switch v-model="formInline.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动状态" v-if="expandInputs">
            <el-select v-model="formInline.state" placeholder="活动状态">
              <el-option label="开启" value="1"></el-option>
              <el-option label="关闭" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button @click="handleRest">重置</el-button>
            <el-button type="text" @click="handleExpand">{{expandBtnText}}</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" size="small">新建</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableList',
  data() {
    return {
      formInline: {
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
      expandInputs: false,
      expandBtnText: ''
    }
  },
  methods: {
    handleRest() {
      this.formInline = {
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
      this.expandInputs = !this.expandInputs
      this.expandBtnText = this.expandInputs ? '收起▲' : '展开▼'
    }
  },
  created() {
    this.expandInputs = false
    this.expandBtnText = '展开▼'
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
