<template>
  <div class="step2">
    <el-form ref="signForm" :model="signForm"  label-width="130px" @submit.prevent="onSubmit">

      <el-form-item label="报名限制" prop="">
          <el-radio-group v-model="signForm.signUpLimit">
              <el-radio  label="无限制" ></el-radio>
              <el-radio  label="必须关注公众号才能报名"></el-radio>
              <el-radio  label="必须成为会员才能报名"></el-radio>
              <el-radio  label="必须分享才能报名"></el-radio>
          </el-radio-group>
        </el-form-item>

      <el-form-item label="每人可报名额限制" prop="">
        <el-row>
          <el-col :span="6">
            <el-radio class="radio" v-model="signForm.numLimit"  label="无限制"></el-radio>
            <el-radio class="radio" v-model="signForm.numLimit"  label="限制"></el-radio>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="0" :number="true" size="large" v-model="signForm.numLimitDetail" :disabled=" signForm.numLimit == '无限制' "><template slot="append">人</template></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="付费活动" prop="">
        <el-row>
          <el-col :span="6">
            <el-radio class="radio" v-model="signForm.cost" label="免费" ></el-radio>
            <el-radio class="radio" v-model="signForm.cost" label="费用"></el-radio>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="0" :number="true" size="large" v-model="signForm.costDetail" :disabled="signForm.cost == '免费'"><template slot="append">元</template></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="允许取消报名" prop="">
        <el-row>
          <el-col :span="6">
            <el-radio class="radio" v-model="signForm.cancel"  label="不允许" ></el-radio>
            <el-radio class="radio" v-model="signForm.cancel"  label="允许"></el-radio>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="活动前几小时"  size="large" v-model="signForm.costDetail" :disabled="signForm.cancel == '不允许'"><template slot="append">小时</template></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="报名是否需要审核" prop="">
        <el-row>
          <el-col :span="6">
            <el-radio class="radio" v-model="signForm.audit"  label="不需要" ></el-radio>
            <el-radio class="radio" v-model="signForm.audit"  label="需要"></el-radio>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="设置报名表" prop="" class="setSign">

            <el-row v-for="item of signForm.signFormList" :key="item.id">
                <el-col :span="3">
                  <el-checkbox class="checkbox" v-model="item.require">必填</el-checkbox>
                </el-col>
                <el-col :span="4" class="title">
                    <el-input  v-model="item.title" size="large"></el-input>
                </el-col>
                <el-col :span="8">
                      <el-input   :placeholder="'提示语:请输入您的'+item.title" size="large" readonly></el-input>
                </el-col>
                <el-col :span="6">
                  <i class="fa fa-trash  fa-lg" aria-hidden="true" @click="removeItem(item)"></i>
                <el-dropdown trigger="click"  style="margin-left: 10px;color: #20a0ff;">
                  <el-button>
                    移动<i class="el-icon-caret-bottom el-icon-right"></i>
                  </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="moveTop(item)">置顶</el-dropdown-item>
                      <el-dropdown-item @click.native="moveUp(item)">上移</el-dropdown-item>
                      <el-dropdown-item @click.native="moveDown(item)">下移</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-button :span="24" type="primary" size="large" @click.native="addItem">添加更多</el-button>
                </el-col>
            </el-row>
      </el-form-item>

      <el-form-item label="签到条件" prop="">
        <el-row>
          <el-col :span="24">
            <el-radio class="radio" v-model="signForm.sign" label="必须报名"></el-radio>
            <el-radio class="radio" v-model="signForm.sign" label="不需要报名"></el-radio>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="签到方式" prop="">
        <el-row>
          <el-col :span="8">
            <el-radio-group v-model="signForm.signType">
              <el-radio  label="签到二维码"></el-radio>
              <el-radio  label="暗号"></el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="5" :pull="2">
              <el-input :disabled="signForm.signType != '暗号'" v-model="signForm.secretCode"  placeholder="请填写您的暗号"  size="large"></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <transition name="list">
        <el-form-item label="生成签到二维码" v-show="signForm.signType == '签到二维码'">
            <el-col :span="4" style="width: 130px;">
                <img width="100" height="100" :src="imgUrl">
            </el-col>
        </el-form-item>
      </transition>

    </el-form>
  </div>
</template>
<script>
import store from '../../store/store.js'
export default {
  name: 'step2',
  data: function() {
    return {
      imgUrl: '',
      signForm: {
        signUpLimit: '无限制',
        numLimit: '无限制',
        numLimitDetail: '',
        cost: '免费',
        costDetail: '',
        cancel: '不允许',
        audit: '不需要',
        needName: true,
        needTel: true,
        signFormList: [],
        sign: '必须报名',
        signType: '签到二维码',
        secretCode: ''
      }
    }
  },
  computed: {},
  watch: {
    signForm: {
      handler: function() {
        store.commit('setSignForm', this.signForm)
      },
      deep: true
    }
  },
  methods: {
    onSubmit: function() {
      console.log('submit!')
    },
    // 添加更多
    addItem: function() {
      var n = this.signForm.signFormList
        ? this.signForm.signFormList.length + 1
        : 1
      this.signForm.signFormList.push({
        title: '标题' + n,
        require: false
      })
    },
    // 删除
    removeItem: function(item) {
      var index = this.signForm.signFormList.indexOf(item)
      this.signForm.signFormList.splice(index, 1)
    },
    // 置顶
    moveTop: function(item) {
      var index = this.signForm.signFormList.indexOf(item)
      if (index !== 0) {
        this.signForm.signFormList.splice(index, 1)
        this.signForm.signFormList.splice(0, 0, item)
      }
    },
    // 上移
    moveUp: function(item) {
      var index = this.signForm.signFormList.indexOf(item)
      if (index !== 0) {
        this.signForm.signFormList.splice(index, 1)
        this.signForm.signFormList.splice(index - 1, 0, item)
      }
    },
    // 下移
    moveDown: function(item) {
      var index = this.signForm.signFormList.indexOf(item)
      var max = this.signForm.signFormList.length
      if (index !== max) {
        this.signForm.signFormList.splice(index, 1)
        this.signForm.signFormList.splice(index + 1, 0, item)
      }
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    Object.assign(this.signForm, store.state.signForm)
  },
  // 组件更新
  updated: function() {}
}
</script>
<style>
.step2 .setSign .el-row {
  line-height: 40px;
  margin-bottom: 10px;
}
.step2 .title {
  text-align: right;
}
.step2 .router-link {
  color: #333;
}
.step2 .el-button-primary .router-link {
  color: #fff;
}
/* dialog 的大小 */
.step2 .el-dialog--small {
  min-width: 400px;
  max-width: 500px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>
