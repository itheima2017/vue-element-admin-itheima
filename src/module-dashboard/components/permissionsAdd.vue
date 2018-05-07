<template>
  <div class="add-form">
    <el-dialog :title="text+pageTitle" :visible.sync="dialogFormVisible">
    <el-form :rules="ruleInline" ref="dataForm" :model="formBase" label-position="left" label-width="120px" style='width: 400px; margin-left:120px;'>
          <el-form-item :label="$t('table.username')" prop="title">
            <el-input v-model="formBase.title"></el-input>
          </el-form-item>
          <el-form-item  :label="$t('table.powerDistriB')">
            <el-tree
              ref="treeMenu"
              :data="treeData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[0]"
              :default-checked-keys="[0]"
              :props="defaultProps" @check-change='handleCheckChange'>
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="handleAdd('formBase')">{{$t('table.confirm')}}</el-button>
        </div>
  </el-dialog>
  
  </div>
</template>
<script>
import { detail, update, add } from '@/api/base/permissions'
import { list } from '@/api/base/menus.js'
let _this = []
export default {
  name: 'usersAdd',
  props: ['text', 'pageTitle', 'ruleInline', 'formBase'],
  data() {
    return {
      dialogFormVisible: false,
      PermissionGroupsmenu: [],
      defaultProps: {
        label: 'title'
      },
      permissions: [],
      treeCheckedNodes: []
    }
  },
  computed: {
    treeData() {
      function createNode(item) {
        // 复选框选择
        let checked = false
        let selected = false
        if (_this !== null && _this.formBase.permissions.length > 0) {
          let per = _this.formBase.permissions.find(function(value, index) {
            return value === item.id
          })
          checked = !!per
        }
        // 标记勾选
        if (!checked) {
          let isPoint = item.childs === undefined && item.points === undefined
          let hasChilds = item.childs !== undefined && item.childs.length > 0
          let hasPoints = item.points !== undefined && item.points.length > 0
          if (isPoint) {
            checked = true
          } else if (hasPoints) {
            checked = false
          } else if (hasChilds) {
            checked = false
          } else {
            checked = true
          }
        }
        return {
          id: item.id === undefined ? 0 : item.id,
          title: item.title,
          children: [],
          selected: selected,
          checked: checked
        }
      }
      function parseNodes(nodes, parentNode) {
        for (let it of nodes) {
          let node = createNode(it)
          // 标记选中
          console.log(node.checked)
          if (node.checked) {
            parentNode.checked = true
          }
          if (it.childs !== undefined && it.childs.length > 0) {
            parseNodes(it.childs, node)
          } else if (it.points !== undefined && it.points.length > 0) {
            parseNodes(it.points, node)
          }
          parentNode.children.push(node)
        }
      }
      let nodes = createNode({ title: '系统菜单和页面权限点' })
      parseNodes(this.PermissionGroupsmenu, nodes)
      return [nodes]
    }
  },
  methods: {
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
    // renderContent(h, { node, data, store }) {
    //   let icon
    //   let platForm
    //   let isShow = false
    //   if (platForm === 0) {
    //     icon = <span icon-style="icon-style" icon-class="el-icon-pc" />
    //     isShow = true
    //   } else {
    //     icon = <span icon-style="icon-style" icon-class="el-icon-wx" />
    //     isShow = false
    //   }
    //   return (
    //     <span style="font-size: 14px; padding-right: 8px">
    //       <span class="normalText">
    //         {icon}
    //         <span style="color: #333;"> {node.label} </span>
    //       </span>
    //     </span>
    //   )
    // },
    setupData() {
      list().then(data => {
        this.PermissionGroupsmenu = data.data
      })
    },

    // 节点复选框被选中
    handleCheckChange(nodes) {
      var treeCheckedNodes = []
      treeCheckedNodes.push(nodes)
    },
    // 表单提交
    handleAdd(object) {
      let curPermissions = []
      let nodesPath = []
      function parseNodes(nodes, findId) {
        for (let it of nodes) {
          nodesPath.push(it)
          let isFind = false
          if (findId === it.id) {
            isFind = true
          }
          if (it.childs !== undefined && it.childs.length > 0 && !isFind) {
            isFind = parseNodes(it.childs, findId)
          } else if (
            it.points !== undefined &&
            it.points.length > 0 &&
            !isFind
          ) {
            isFind = parseNodes(it.points, findId)
          } else {
          }
          if (isFind) {
            for (let item of nodesPath) {
              if (curPermissions.indexOf(item.id) === -1) {
                curPermissions.push(item.id)
              }
            }
            nodesPath = []
            return isFind
          }
          nodesPath.pop()
          // return isFind
        }
      }
      // console.log(this.$refs.treeMenu.getCheckedNodes())
      if (this.treeCheckedNodes.length === 0) {
        this.treeCheckedNodes = this.$refs.treeMenu.getCheckedNodes()
      }
      for (let it of this.treeCheckedNodes) {
        // console.log(` > id:${it.id} , title:${it.title}`)
        nodesPath = []
        parseNodes(this.PermissionGroupsmenu, it.id)
      }
      // console.log(`curPermissions: ${curPermissions}`)
      if (curPermissions.length === 0 && this.formBase.id) {
        curPermissions = this.formBase.permissions
      }
      // console.log(`curPermissions: ${curPermissions}`)
      if (!curPermissions.length) {
        this.$message({
          showClose: true,
          message: '请选择需要的权限及页面权限点',
          type: 'error'
        })
        // return
      } else {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.$emit('handleCloseModal')
            if (_this.formBase.id) {
              let technologyTypes = []
              var data = {
                id: this.formBase.id,
                title: this.formBase.title,
                permissions: curPermissions
              }
              update(data).then(() => {
                this.$emit('newDataes', this.formBase)
              })
            } else {
              add({
                title: this.formBase.title,
                permissions: curPermissions
              }).then(() => {
                this.$emit('newDataes', this.formBase)
              })
            }
          } else {
            this.$Message.error('*号为必填项!')
          }
        })
      }
    }
  },
  // 挂载结束

  mounted: function() {},
  // 创建完毕状态
  created() {
    _this = this
    this.setupData()
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
