<template>
  <div class="add-form">
    <el-dialog :title="apiTitle" :visible.sync="dialogFormVisible">
    <el-form :rules="ruleInline" ref="dataForm" :model="formBase" label-position="left" label-width="120px" style='width: 400px; margin-left:120px;'>
          <el-form-item :label="$t('table.powerTitle')" prop="title">
            <el-input v-model="formBase.title"></el-input>
          </el-form-item>
          <el-form-item  :label="$t('table.powerDistriB')">
            <el-tree
              ref="treeMenu"
              :data="treeData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[0]"
              :props="defaultProps" @check-change='handleCheckChange'>
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">{{$t('table.signOut')}}</el-button>
          <el-button type="primary" @click="handleSave('formBase')">{{$t('table.preserve')}}</el-button>
        </div>
  </el-dialog>
  
  </div>
</template>
<script>
import { detail, update, add } from '@/api/base/permissions'
import { list } from '@/api/base/menus.js'
let _this = []
export default {
  name: 'PermissionGroupsApiAdd',
  props: ['apiTitle', 'ruleInline'],
  data() {
    return {
      dialogFormVisible: false,
      PermissionGroupsmenu: [],
      defaultProps: {
        label: 'title'
      },
      formBase: {
        id: 0,
        title: '',
        apis: []
      },
      PermissionApiData: [],
      checkedData: []
    }
  },
  computed: {
    // 菜单权限树
    treeData() {
      let checkedData = this.PermissionApiData

      let checked = false
      if (_this !== null && _this.formBase.apis.length > 0) {
        let per = _this.formBase.apis.map(item => {
          return item
        })
        let use = per.map(item => {
          checkedData.filter(mini => {
            if (mini.id === item) {
              mini.checked = true
            }
          })
        })
      }
      return checkedData
    }
  },
  methods: {
    // 逻辑业务
    // **********************************
    // **********************************
    // 弹层显示
    dialogFormV() {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH() {
      this.dialogFormVisible = false
    },
    // 退出
    handleClose() {
      this.$emit('handleCloseModal')
    },
    // 节点复选框被选中
    handleCheckChange(nodes) {
      var checkedData = []
      checkedData.push(nodes)
    },
    // 高级接口数据列表
    loadApiPermissionData() {
      list().then((ret, err) => {
        if (err) {
          return err
        }
        _this.PermissionApiData = ret.data
      })
    },
    // 高级接口表单详情数据加载
    hanldeEditApiForm(objeditId) {
      // 获取权限标题
      this.formBase.id = objeditId
      details({ id: objeditId }).then((ret, err) => {
        if (err) {
          return err
        }
        this.formBase.id = ret.data.id
        this.formBase.title = ret.data.title
      })
      _this.loadApiPermissionData()
      // 读取授权
      apiread({ id: objeditId }).then((ret, err) => {
        if (err) {
          return err
        }
        this.formBase.apis = ret.data.apis
      })
    },
    // 表单提交
    handleSave(object) {
      let curApis = []
      for (let it of _this.checkedData) {
        curApis.push(it.id)
      }
      this.$refs[object].validate(valid => {
        if (valid) {
          this.$emit('handleCloseModal')
          apiadd({ id: _this.formBase.id, apis: curApis }).then((ret, err) => {
            if (err) {
              return err
            }
            this.$emit('newDataes', this.formBase)
          })
        } else {
          this.$Message.error('*号为必填项!')
        }
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
.el-tree {
  margin-top: 8px;
}
.el-tree-node__content {
  height: auto;
}
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-dialog__footer {
  text-align: right;
}
</style>
