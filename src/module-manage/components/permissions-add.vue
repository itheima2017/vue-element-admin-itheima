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
              :default-checked-keys="formBase.permissions"
              :props="defaultProps" @check='handleCheckChange'>
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
  props: ['text', 'pageTitle', 'ruleInline'],
  data() {
    return {
      dialogFormVisible: false,
      PermissionGroupsmenu: [],
      defaultProps: {
        label: 'title'
      },
      permissions: [],
      treeCheckedNodes: [],
      formBase: {
        id: 0,
        create_date: '',
        title: '',
        permissions: []
      },
      curPermissions: []
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
          selected = !!per
        }
        // 标记勾选
        if (selected) {
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
          // console.log(node.checked)
          if (node.checked) {
            parentNode.selected = true
          }
          if (it.childs !== undefined && it.childs.length > 0) {
            parseNodes(it.childs, node)
          } else if (it.points !== undefined && it.points.length > 0) {
            parseNodes(it.points, node)
          }
          parentNode.children.push(node)
        }
      }
      let nodes = createNode({ title: '系统菜单和页面权限点', expand: true })
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
    // 表单重置
    handleResetForm() {
      this.formBase = {
        id: 0,
        title: '',
        permissions: []
      }
    },
    // 编辑详情数据加载
    hanldeEditForm(objeditId) {
      this.formBase.id = objeditId
      var data = {
        id: objeditId
      }
      detail(data).then((ret, err) => {
        if (err) {
          return err
        }
        this.formBase.id = ret.data.id
        this.formBase.title = ret.data.title
        this.formBase.permissions = ret.data.permissions
      })
    },
    setupData() {
      list().then(data => {
        this.PermissionGroupsmenu = data.data
      })
    },

    // 节点复选框被选中
    handleCheckChange(data, checked, indeterminate) {
      this.treeCheckedNodes = checked.checkedNodes
    },
    // 表单提交
    handleAdd(object) {
      this.parseN()
      var curPerLenth = this.curPermissions.length
      // console.log(`curPermissions: ${curPermissions}`)
      if (curPerLenth === 0 && this.formBase.id) {
        this.curPermissions = this.formBase.permissions
      }
      // console.log(`curPermissions: ${curPermissions}`)
      if (!curPerLenth) {
        this.$message({
          showClose: true,
          message: '请选择需要的权限及页面权限点',
          type: 'error'
        })
        // return
      } else {
        this.dataFormSub(this.curPermissions)
      }
    },
    parseN() {
      let curPermissions = []
      let nodesPath = []
      function parseNodes(nodes, findId) {
        nodes.map(function(it, index) {
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
            _this.nodeDate(nodesPath, curPermissions, findId)
            nodesPath = []
            return isFind
          }
          nodesPath.pop()
        })
      }
      // console.log(this.$refs.treeMenu.getCheckedNodes())
      if (this.treeCheckedNodes.length === 0) {
        this.treeCheckedNodes = this.$refs.treeMenu.getCheckedNodes()
      }
      for (let it of this.treeCheckedNodes) {
        // console.log(` > id:${it.id} , title:${it.title}`)
        it.checked = true
        nodesPath = []
        parseNodes(this.PermissionGroupsmenu, it.id)
      }
      this.curPermissions = curPermissions
    },
    nodeDate(nodesPath, curPermissions, findId) {
      nodesPath.map(function(item, index) {
        if (curPermissions.indexOf(item.id) === -1) {
          curPermissions.push(findId)
        }
      })
    },
    dataFormSub(curPermis) {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$emit('handleCloseModal')
          if (_this.formBase.id) {
            let technologyTypes = []
            var data = {
              id: this.formBase.id,
              title: this.formBase.title,
              permissions: curPermis
            }
            update(data).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          } else {
            add({
              title: this.formBase.title,
              permissions: curPermis
            }).then(() => {
              this.$emit('newDataes', this.formBase)
            })
          }
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
