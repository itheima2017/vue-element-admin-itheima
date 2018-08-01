<template>
    <div class="step1">
      <el-form :model="ruleForm" class="demo-ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
        <el-form-item label="发布名称" prop="name">
            <el-input v-model="ruleForm.name" size="large" placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item label="发布分类" prop="fenLei">
          <el-row style="height: 35px;" type="flex" align="middle">
            <el-col :span="3">
              <div class="el-form-item__label" style="padding-bottom: 0;"> 发布分类</div>
            </el-col>
            <el-col  class="" :span="2">
              <el-button type="text" @click.native="dialogFormFenLeiVisible = true" style="margin: 0;padding: 0;">设置</el-button>
            </el-col>
          </el-row>
          <el-radio-group v-model="ruleForm.fenLei" >
            <el-radio v-for="item of ruleForm.fenLeis" :label="item.name" :key="item.id"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布标签" required>
            <el-tag
              v-for="tag in ruleForm.tags"
              :closable="true"
              type="primary"
              @close="handleClose(tag)"
              :key='tag.id'
               >
              {{tag.name}}
            </el-tag>
          <el-button icon="plus" size="large" @click.native="showDialog" style="vertical-align: middle;"><i class="fa fa-plus" aria-hidden="true"></i></el-button>
          <transition name="fade">
            <div class="el-form-item__error" v-show="tagsValid">{{ tagsError }}</div>
          </transition>
        </el-form-item>

        <el-form-item label="发布时间" required style="width: 750px;">
          <el-col :span="5">
            <el-form-item prop="activeStartTimeDate">

              <el-date-picker
                v-model="ruleForm.activeStartTimeDate"
                type="date"
                placeholder="活动开始日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item prop="activeStartTimeTime">
              <el-time-select
                placeholder="请选择时间点"
                v-model="ruleForm.activeStartTimeTime"
                :picker-options="{start: '00:00',step: '00:15',end: '23:45'}">
              </el-time-select>
            </el-form-item>
          </el-col>

          <el-col :span="1" style="text-align: center;">—</el-col>

          <el-col :span="5">
            <el-form-item prop="activeEndTimeDate">

              <el-date-picker
                v-model="ruleForm.activeEndTimeDate"
                type="date"
                placeholder="活动结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item prop="activeEndTimeTime">
              <el-time-select
                placeholder="请选择时间点"
                v-model="ruleForm.activeEndTimeTime"
                :picker-options="{start: '00:00',step: '00:15',end: '23:45'}">
              </el-time-select>
            </el-form-item>
          </el-col>

        </el-form-item>
        <el-form-item label="活动地点" required >
          <AddressSelect :province="ruleForm.province" id="address"
              :city="ruleForm.city"
              :detail="ruleForm.detail"
              :isAddressTrue="isAddressTrue"></AddressSelect>
        </el-form-item>

        <el-form-item label="活动人数">
            <el-radio class="radio" v-model="ruleForm.activePerson" label="无限制">无限制</el-radio>
            <el-radio class="radio" v-model="ruleForm.activePerson" label="限制">限制</el-radio>
            <el-input placeholder="0" :number="true" size="large" style='width:150px' v-model="ruleForm.activePersonNum" :disabled=" ruleForm.activePerson == '无限制' "><template slot="append">人</template></el-input>
        </el-form-item>

        <el-form-item label="活动封面">
          <el-upload 
          class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动简介">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              :autosize="{minRows: 4, maxRows: 8}"
              v-model="ruleForm.activeDescribe">
            </el-input>
        </el-form-item>
        </el-form>

      <!-- 弹框 -->
      <el-dialog title="添加活动标签"  :visible.sync="dialogFormVisible">
        <el-form :model="dialogForm">
          <el-form-item>
            <el-input v-model="dialogForm.name" auto-complete="off" ></el-input>
          </el-form-item>
        </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click.native="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary"  @click.native="handleAdd(dialogForm.name,dialogForm,ruleForm.tags)">添加</el-button>
                </span>
      </el-dialog>

      <!-- 设置活动分类 -->
      <el-dialog title="设置活动分类" :visible.sync="dialogFormFenLeiVisible">
        <el-form :model="dialogFormFenLei">
          <el-form-item>
            <el-tag
              v-for="feiLei of ruleForm.fenLeis"
              :closable="true"
              type="primary"
              @close="handleCloseFenLei(feiLei)"
              :key='feiLei.id'
              >
              {{ feiLei.name }}
            </el-tag>
          </el-form-item>
          <el-form-item>
            <el-input v-model="dialogFormFenLei.name" auto-complete="off" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="dialogFormFenLeiVisible = false">取 消</el-button>
          <el-button type="primary"  @click.native="handleAdd(dialogFormFenLei.name,dialogFormFenLei,ruleForm.fenLeis)">添加</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import AddressSelect from '../../components/address.vue'
import store from '../../store/store.js'

export default {
  name: 'ActivePublic',
  components: {
    AddressSelect: AddressSelect
  },
  data: function() {
    return {
      tagsValid: false,
      tagsError: '请设置标签',
      isAddressTrue: false,
      dialogFormVisible: false,
      dialogFormFenLeiVisible: false,
      dialogForm: { name: '' },
      dialogFormFenLei: { name: '' },
      // ruleFormChange: false,
      ruleFormValid: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        fenLei: [
          { required: true, message: '请选择活动分类', trigger: 'change' }
        ],
        activeStartTimeDate: [
          { required: true, message: '请选择活动开始日期', trigger: 'change' }
        ],
        activeStartTimeTime: [
          { required: true, message: '请选择活动开始时间', trigger: 'change' }
        ],
        activeEndTimeDate: [
          { required: true, message: '请选择活动结束日期', trigger: 'change' }
        ],
        activeEndTimeTime: [
          { required: true, message: '请选择活动结束时间', trigger: 'change' }
        ]
      },
      ruleForm: {
        fenLei: '',
        tags: [],
        activeStartTimeDate: '',
        activeStartTimeTime: '',
        activeEndTimeDate: '',
        activeEndTimeTime: '',
        activePerson: '',
        activePersonNum: '',
        activeDescribe: ''
      }
    }
  },
  computed: {},
  methods: {
    // 清除
    handleReset: function() {
      this.$refs.ruleForm.resetFields()
    },
    // 设置标签限制
    showDialog: function() {
      if (this.ruleForm.tags.length >= 5) {
        this.$message({
          message: '最多设置5个标签',
          type: 'warning'
        })
      } else {
        this.dialogFormVisible = true
        this.dialogForm = {}
      }
    },
    // 关闭标签
    handleClose: function(tag) {
      var index = this.ruleForm.tags.indexOf(tag)
      this.ruleForm.tags.splice(index, 1)
    },
    // 删除活动弹层分类
    handleCloseFenLei: function(fenLei) {
      var index = this.ruleForm.fenLeis.indexOf(fenLei)
      this.ruleForm.fenLeis.splice(index, 1)
    },
    // 添加标签
    handleAdd: function(tag, form, tags) {
      if (tag && tag.trim().length !== 0) {
        var isExist = false
        tag = tag.trim()
        for (var i = 0; i < tags.length; i++) {
          if (tags[i].name === tag) {
            isExist = true
            break
          }
        }
        if (isExist) {
          this.$message({
            message: '该标签已存在',
            type: 'warning'
          })
        } else {
          this.dialogFormVisible = false
          this.dialogFormFenLeiVisible = false
          tags.push({
            name: tag
          })
        }
      } else {
        this.$message({
          message: '标签不能为空',
          type: 'warning'
        })
      }
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created: function() {
    var _this = this
    Object.assign(this.ruleForm, store.state.ruleForm)
  },
  // 组件更新
  updated: function() {},
  beforeRouteLeave: function(to, from, next) {
    if (to.path === '/activePublic/step2') {
      var _this = this
      this.isAddressTrue = true
      var fals = false
      this.tagsValid = this.ruleForm.tags.length ? fals : true
      this.$refs.ruleForm.validate(function(valid) {
        !_this.tagsValid && valid ? next() : next(false)
      })
    } else {
      next()
    }
  }
}
</script>
<style>
.step {
  margin-bottom: 30px;
}
.step1 .demo-ruleForm .el-form-item {
  margin-bottom: 15px;
  margin-right: 50px;
}

.step1 .el-form-item.is-required .el-form-item__label:after {
  content: '*';
  color: #ff4949;
  margin-right: 4px;
}
.step1 .el-form-item.is-required .el-form-item__label:before {
  display: none;
}
/* 标签 */
.step1 .el-tag {
  margin: 5px;
  vertical-align: middle;
  height: auto;
}
.step1 .el-tag:first-child {
  margin-left: 0;
}

/* 对话框 */
.step1 .el-dialog--small {
  width: 564px;
}
.step1 .el-dialog__body {
  padding-bottom: 0;
}
.step1 .el-dialog__body .el-form-item {
  margin-bottom: 10px;
}
.step1 .el-dialog__wrapper .el-button {
  margin-left: 15px;
}

/* 时间选择器 */
.step1 .el-date-editor {
  width: 120px;
}

.step1 .el-form-item .router-link {
  color: #fff;
}
.el-form-item__error {
  white-space: nowrap;
}
.el-input--suffix .el-input__inner {
  padding-right: 0;
}
</style>
