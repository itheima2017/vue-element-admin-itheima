<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="never">
        <el-form ref="formDate" :model="formDate" :rules="rules" label-width="300px">
          <el-form-item label="标题" prop="name">
            <el-input v-model="formDate.name" placeholder="给标题起个名字"></el-input>
          </el-form-item>
          <el-form-item label="起止日期" prop="dateRange">
            <label slot="label"><i style="color:#f56c6c;font-size: 12px;margin-right: 4px;font-style: normal;">*</i>起止日期</label>
            <el-date-picker type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :picker-options="pickerOptions"
                :default-value="timeDefaultShow"
                v-model="formDate.dateRange"
                >
          </el-date-picker>
          </el-form-item>
          <el-form-item label="目标描述" prop="desc">
            <el-input type="textarea" v-model="formDate.desc" placeholder="请输入目标"></el-input>
          </el-form-item>
          <el-form-item label="衡量标准" prop="standard">
            <el-input type="textarea" v-model="formDate.standard" placeholder="请输入衡量标准"></el-input>
          </el-form-item>
          <el-form-item label="客户" prop="userName">
            <label slot="label">客户<em class="optional">（选填）</em>
            <el-tooltip class="item" effect="dark" content="目标的服务对象" placement="top">
              <i class="fa fa-info-circle" aria-hidden="true"></i>
            </el-tooltip>
            </label>
            <el-input v-model="formDate.userName" placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"></el-input>
          </el-form-item>
          <el-form-item label="邀评人" prop="invitation">
            <label slot="label">邀评人<em class="optional">（选填）</em></label>
            <el-input v-model="formDate.invitation" placeholder="请直接 @姓名／工号，最多可邀请 5 人"></el-input>
          </el-form-item>
          <el-form-item label="权重" prop="weight">
            <label slot="label">权重<em class="optional">（选填）</em></label>
            <el-input v-model="formDate.weight" placeholder="请输入" maxlength='50' style="width:100px;"></el-input><span class="optional"> %</span>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="formDate.resource"  @change="changeHandler">
              <el-radio label="1">公开</el-radio>
              <el-radio label="2">部分公开</el-radio>
              <el-radio label="3">不公开</el-radio>
            </el-radio-group>
            <div>客户、邀评人默认被分享</div>
            <div v-show="showradio">
              <el-autocomplete
              class="inline-input"
              v-model="formDate.state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
            ></el-autocomplete>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formDate')">立即创建</el-button>
            <el-button @click="resetForm('formDate')">重置</el-button>
          </el-form-item>
        </el-form>
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
        name: '', // 用户
        dateRange: '', // 日期
        desc: '', // 描述
        standard: '', // 衡量标准
        userName: '', // 客户
        invitation: '', // 邀评人
        weight: '', // 权重
        resource: '', // 资源
        state1: '',
        state2: ''
      },
      restaurants: [{ value: '甲' }, { value: '乙' }, { value: '丙' }],

      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        standard: [
          { required: true, message: '请输入衡量标准', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() - 24 * 60 * 60 * 1000 ||
            time.getTime() < Date.now() - 30 * 24 * 60 * 60 * 1000
          )
        }
      }
    }
  },
  created() {
    let that = this
    that.timeDefaultShow = new Date()
    that.timeDefaultShow.setMonth(new Date().getMonth() - 1)
  },
  methods: {
    // 清空表单
    emptyDate() {
      this.formDate.name = ''
      this.formDate.dateRange = ''
      this.formDate.desc = ''
      this.formDate.standard = ''
      this.formDate.userName = ''
      this.formDate.invitation = ''
      this.formDate.weight = ''
      this.formDate.resource = ''
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (
            this.formDate.dateRange[0] === undefined &&
            this.formDate.dateRange[1] === undefined
          ) {
            this.$message.error('请输入起止日期')
            return false
          }
          var oneTime = new Date().setTime(
            new Date(this.formDate.dateRange[0]).getTime()
          )
          var twoTime = new Date().setTime(
            new Date(this.formDate.dateRange[1]).getTime()
          )
          if (oneTime + 3600 * 1000 * 24 * 30 < twoTime) {
            this.$alert('日期范围最大为30天', '温馨提示', {
              confirmButtonText: '确定',
              type: 'info'
            })
          }
          this.emptyDate()
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //
    changeHandler(value) {
      if (value === '2') {
        this.showradio = true
      } else {
        this.showradio = false
      }
    },
    // 菜单搜索
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    }
  }
}
</script>
<style>
.el-form label {
  font-weight: normal;
}

.optional {
  color: rgba(0, 0, 0, 0.45);
  font-style: normal;
}
.el-autocomplete {
  display: block;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-input,
.el-textarea {
  width: 50%;
}
</style>
