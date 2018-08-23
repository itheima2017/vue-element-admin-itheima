<template>
  <div class="add-form">
    <el-dialog :title="text+pageTitle" :visible.sync="dialogFormVisible">
    <el-form :rules="ruleInline" ref="formMenu" :model="formMenu" label-position="left" label-width="120px" style='width: 400px; margin-left:120px;'>
          <el-form-item :label="$t('table.permissionUser')">
              <el-radio-group v-model="type" class="choose-type" @change="handleChooseType">
                <el-radio label="menu" class="choose-item" :disabled="typeStatus">菜单</el-radio>
                <el-radio label="points" class="choose-item" :disabled="typeStatus">权限点</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('table.permissionUser')">
              <el-select v-model="formMenu.pid">
                <el-option :value="0" :label="$t('table.powerNav')">主导航</el-option>
                <el-option v-for="(items) in notPointDataList" :value="items.id" :key="items.id" :label="items.title" :disabled="(type === 'points') && !!(items.childs)" :class="'moveIn'+items.layer">
                </el-option>
              </el-select>

            </el-form-item>
          <div v-if="showMenuBlock">
            <el-form-item :label="$t('table.powerCode')" prop="code">
              <el-input v-model="formMenu.code"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.powerTitle')" prop="title">
              <el-input v-model="formMenu.title"></el-input>
            </el-form-item>
          </div>
          <div v-if="showPointBlock" :model="formPoints">
            <el-form-item :label="$t('table.powerCode')" prop="code">
              <el-input v-model="formPoints.code"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.powerTitle')" prop="title">
              <el-input v-model="formPoints.title"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="handleSubmit('formMenu')">{{$t('table.confirm')}}</el-button>
        </div>
  </el-dialog>
  
  </div>
</template>
<script>
import { list, detail, update, add } from '@/api/base/menus'
import Utils from '@/components/TreeTable/utils/dataTranslate.js'
let _this = []
export default {
  name: 'items',
  // props: ['text', 'pageTitle', 'PermissionGroupsList',],
  props: {
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这个是是否展示操作列
    text: {
      type: String
    },
    pageTitle: {
      type: String
    },
    PermissionGroupsList: {
      type: Array
    }
  },
  data() {
    const validateCode = (rule, value, callback) => {
      var thisCode = _this.formMenu.code
      if (value === '') {
        callback(new Error('代码不能为空'))
      } else {
        validateCode.ifHave = false
        var thisPid = _this.formMenu.pid
        validateCode.ifHaveCodeExciting = function(oldList) {
          for (var i = 0; i < oldList.length; i++) {
            if (oldList[i].childs && oldList[i].childs.length > 0) {
              validateCode.ifHaveCodeExciting(oldList[i].childs)
            }
            if (oldList[i].points && oldList[i].points.length > 0) {
              if (oldList[i].id === thisPid) {
                validateCode.doPoints(oldList[i].points)
              }
            }
          }
        }
        validateCode.doPoints = function(points) {
          for (var i = 0; i < points.length; i++) {
            if (points[i].code && points[i].code === thisCode) {
              validateCode.ifHave = true
            }
          }
        }
        validateCode.ifHaveCodeExciting(_this.parentDataList)
        callback()
        // if (validateCode.ifHave) {
        //   callback(new Error('此代码已存在，不能添加相同的！！'))
        // } else {
        //   callback()
        // }
      }
    }
    return {
      type: 'menu',
      showMenuBlock: true,
      showPointBlock: false,
      dialogFormVisible: false,
      typeStatus: false,
      notPointDataList: [],
      parentDataList: [],
      formMenu: {
        pid: '', // 父级Id
        is_point: '', // 是否权限点
        code: '', // 菜单代码
        title: '' // 标题
      },
      formPoints: {
        pid: '', // 父级Id
        is_point: '', // 是否权限点
        code: '', // 菜单代码
        title: '' // 标题
      },
      codepast: '',
      ruleInline: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        code: [{ required: true, validator: validateCode, trigger: 'blur' }]
      },
      leafCount: []
    }
  },
  computed: {},
  methods: {
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    handleChooseType() {
      if (this.type === 'menu') {
        _this.changeToMenu()
      }
      if (this.type === 'points') {
        _this.changeToPoints()
      }
    },
    changeType(flag) {
      if (flag === 'menu') {
        this.type = 'menu'
        _this.changeToMenu()
      }
      if (flag === 'points') {
        this.type = 'points'
        _this.changeToPoints()
      }
      this.typeStatus = true
    },
    changeArays() {
      var changeAray = oldArray => {
        for (var i = 0; i < oldArray.length; i++) {
          // 数据没有code并且没有子元素时
          if (oldArray[i].code !== undefined) {
            _this.notPointDataList.push(oldArray[i])
          }
          // 数据有子元素时
          if (oldArray[i].childs && oldArray[i].childs.length > 0) {
            changeAray(oldArray[i].childs)
          }
        }
      }
      changeAray(_this.parentDataList)
    },
    changeToMenu() {
      _this.showMenuBlock = true
      _this.showPointBlock = false
      _this.notPointDataList = []
      this.changeArays()
    },
    changeToPoints() {
      _this.showMenuBlock = false
      _this.showPointBlock = true
      _this.formMenu = _this.formPoints
      _this.formMenu.pid = _this.formPoints.pid
      _this.formMenu.code = _this.formPoints.code
      _this.formMenu.title = _this.formPoints.title
      _this.notPointDataList = []
      this.changeArays()
    },
    // 退出
    handleClose() {
      this.$emit('handleCloseModal')
    },
    // 菜单和权限点选择：编辑
    handle_Edit(object) {
      update(this.formMenu).then(() => {
        this.$emit('handleCloseModal')
        this.$emit('newDataes', this.formMenu)
      })
    },
    // 菜单和权限点选择：添加
    select_Add() {
      add(this.formMenu).then(() => {
        _this.handleResetForm()
        // _this.type = 'menu'
        this.$emit('handleCloseModal')
        this.$emit('newDataes', this.formMenu)
      })
    },
    handle_Add(object) {
      if (_this.type === 'points') {
        this.formMenu.is_point = true
        this.select_Add()
      } else {
        this.formMenu.is_point = false
        this.select_Add()
      }
    },
    // 表单提交
    handleSubmit(object) {
      _this.formMenu.pid = Number(_this.formMenu.pid)
      if (_this.formMenu.id) {
        var thisCode = _this.formMenu.code // 输入的code值
        if (thisCode === this.codepast) {
          // Code不变
          this.$refs.formMenu.validateField('title')
          _this.handle_Edit(object)
        } else {
          // Code变化
          _this.$refs[object].validate(valid => {
            if (valid) {
              _this.handle_Edit(object)
            } else {
              this.$Message.error('表单验证失败')
            }
          })
        }
      } else {
        _this.$refs[object].validate(valid => {
          if (valid) {
            _this.handle_Add(object)
          } else {
            this.$Message.error('表单验证失败')
          }
        })
      }
    },
    // 表单详情
    dataRest(obj) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].childs && obj[i].childs.length > 0) {
          for (var j = 0; j < obj[i].childs.length; j++) {
            this.$set(obj[i].childs[j], 'layer', 1)
          }
        }

        this.$set(obj[i], 'layer', 0)
      }
    },
    hanldeEditForm(objeditId) {
      this.formMenu.id = objeditId
      list().then(data => {
        _this.parentDataList = data.data
        _this.notPointDataList = []
        this.dataRest(data.data)
        this.changeArays()
      })
      detail({ id: objeditId }).then(data => {
        this.formMenu.id = data.data.id
        this.formMenu.pid = data.data.pid
        this.formMenu.title = data.data.title
        this.formMenu.code = data.data.code
        this.formMenu.is_point = data.data.is_point
        let responseData = data.data
        let choose = this.type
        if (choose === 'points') {
          this.formMenu.code = data.data.code
        }
        if (responseData.pid === null) {
          this.formMenu.pid = 0
        }
      })
    },
    // 表单重置
    handleResetForm() {
      this.formMenu.id = ''
      this.formMenu.pid = 0
      this.formMenu.title = ''
      this.formMenu.code = ''
      _this.typeStatus = false
      _this.type = 'menu'
      list().then(data => {
        _this.parentDataList = data.data
        _this.notPointDataList = _this.parentDataList
        this.dataRest(data.data)
        _this.changeToMenu()
      })
    }
  },
  // 挂载结束
  mounted: function() {},
  // 创建完毕状态
  created() {
    _this = this
  },
  // 组件更新
  updated: function() {}
}
</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-dialog__footer {
  text-align: right;
}
.moveIn0 {
  text-indent: 14px;
}

.moveIn1 {
  text-indent: 28px;
}
</style>
<style scoped lang="scss">
.el-fade-in-linear-enter-active,
.el-fade-in-linear-leave-active,
.fade-in-linear-enter-active,
.fade-in-linear-leave-active {
  transition: opacity 0.2s linear;
}

.el-fade-in-enter,
.el-fade-in-leave-active,
.el-fade-in-linear-enter,
.el-fade-in-linear-leave,
.el-fade-in-linear-leave-active,
.fade-in-linear-enter,
.fade-in-linear-leave,
.fade-in-linear-leave-active {
  opacity: 0;
}

.select-search {
  a {
    color: #333;
    text-decoration: none;
    padding: 5px;
  }
  ul {
    list-style: none;
    padding: 6px 0;
    margin: 0;
    overflow: visible;
    li {
      display: block;
      width: 100%;
      padding: 5px;
      font-size: 14px;
      padding: 8px 10px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #48576a;
      height: 36px;
      line-height: 1.5;
      box-sizing: border-box;
      cursor: pointer;
      &.active {
        background-color: #20a0ff;
        a {
          color: #fff;
        }
      }
    }
  }
  .select-header {
    position: relative;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    outline: 0;
    padding: 0 8px;
    > input {
      border: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      outline: 0;
      box-sizing: border-box;
      color: #1f2d3d;
      font-size: inherit;
      height: 36px;
      line-height: 1;
    }
    > i {
      transition: all 0.3s linear;
      display: inline-block;
      position: absolute;
      right: 3%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .select-body {
    z-index: 1000;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 8px;
    > input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      box-sizing: border-box;
      color: #1f2d3d;
      font-size: inherit;
      height: 36px;
      line-height: 1;
      outline: 0;
      padding: 3px 10px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      display: inline-block;
    }
  }
}
</style>

作者：CRPER
链接：https://juejin.im/post/5972ea2f6fb9a06bc569204f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
