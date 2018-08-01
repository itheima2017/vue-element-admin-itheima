<template>
<div class="dashboard-container">
    <div class="app-container">
      <div class="el-card">
    <div class="activePublic ">
      <el-steps :active="step" class="step"  align-center>
        <el-step title="发布活动信息" description=""></el-step>
        <el-step title="报名签到" description=""></el-step>
        <el-step title="分享设置" description=""></el-step>
      </el-steps>
      <transition name="fade">
        <router-view class="view"></router-view>
      </transition>
        <div class="but-group">
          <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button>
          <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">下一步</el-button>
        </div>
    </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'ActivePublic',
  data: function() {
    return {
      isRouter: false,
      preStep: false,
      nextStep: true,
      step: 1
    }
  },
  computed: {
    
  },
  watch: {
    
    $route: function(to, from) {
      this.isRouter = true
    }
  },
  methods: {
    // 上一步
    handlePreStep: function() {
      this.$router.go(-1)
      this.step--
      this.goStep(this.step)
    },
    // 下一步
    handleNextStep: function() {
      this.$router.push('/form/step-form/step' + (this.step + 1))
      var _this = this
      setTimeout(function() {
        if (_this.isRouter) {
          _this.step++
          _this.goStep(_this.step)
        }
      })
    },
    // 按钮控制
    goStep: function(n) {
      switch (n) {
        case 1:
          this.preStep = false
          this.nextStep = true
          break
        case 2:
          this.preStep = true
          this.nextStep = true
          break
        case 3:
          this.preStep = true
          this.nextStep = false
          break
      }
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    // this.$router.push('/activePublic')
  },
  // 组件更新
  updated: function() {}
}
</script>
<style>
.activePublic {
  width: 50%;
  margin: 0 auto;
  padding: 50px 0;
}
.activePublic .router-link {
  color: #fff;
}
.activePublic .but-group .el-button {
  margin-right: 20px;
}
.stepBox {
  padding: 50px 100px 0;
}
.but-group {
  padding-left: 130px;
}
.el-form-item label,
.formCon label {
  font-weight: normal;
}
.formCon label {
  display: inline-block;
  width: 100px;
  text-align: right;
  font-size: 14px;
  color: #606266;
}
.fa-check-circle {
  color: green;
}
.el-input,
.el-textarea {
  width: 100%;
}
.fa {
  /* margin-left: 20px; */
}
</style>
