<template>
  <div class="add-form">
    <el-dialog :title="text+page_title" :visible.sync="dialogFormV">
    <el-form :rules="ruleInline" ref="dataForm" :model="formBase" label-position="left" label-width="120px" style='width: 400px; margin-left:120px;'>
          <el-form-item :label="$t('table.username')" prop="username">
            <el-input v-model="formBase.username"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.paddword')" prop="password" v-if="formBase.password!=undefined">
            <el-input v-model="formBase.password"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.phone')" prop="phone">
            <el-input v-model="formBase.phone"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.email')" prop="email">
            <el-input v-model="formBase.email"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.permissionUser')" prop="permission_group_id">
            <el-select class="filter-item" v-model="formBase.permission_group_id">
              <el-option v-for="(item) in PermissionGroupsList" :value="item.id" :key="item.id">{{item.title}}
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 头像上传下一个版本再做 -->
          <!-- <el-form-item :label="$t('table.avatar')" prop="avatar">
            <el-upload
              class="upload-demo"
              :action="importFileUrl"
              :on-change="handleChange"
              :file-list="fileList" accept="image/jpeg,image/gif,image/png,image/bmp" 
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item> -->
          <el-form-item :label="$t('table.introduction')">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="formBase.introduction">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        </div>
  </el-dialog>
  
  </div>
</template>
<script>
import {simple} from '@/api/base/permissions'
import { detail, update, add } from '@/api/base/users'
export default {
  name: 'usersAdd',
  props: ['text', 'page_title', 'dialogFormV'],
  data () {
    return {
        PermissionGroupsList: [], // 权限组加载
        formBase: {
            email: '',
            phone: '',
            username: '',
            password: '',
            permission_group_id: '',
            avatar: '',
            introduction: ''
            },
        ruleInline: {
            username: [
                { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
            ],
            permission_group_id: [
                { type: 'number', required: true, message: '权限组名称不能为空', trigger: 'change' }
            ]
        },
        fileList: [],
        // importFileUrl: 'https://jsonplaceholder.typicode.com/posts/',
        imageFileName: []
    }
  },
  computed: {
  },
  methods: {
    // 权限列表
    setupData() {
        simple().then(data => {
        this.PermissionGroupsList = data.data
      })
    },
    // 退出
    handleClose() {
        this.$emit('handleCloseModal')
    },
    // 表单详情数据加载
    hanldeEditForm(objeditId) {
      this.formBase.id = objeditId
      detail({ 'id': objeditId }).then((data, err) => {
        console.log(data.data.list)
        var datalist = data.data.list[0]
            if (err) {
                return err
            }
            this.formBase.id = datalist.id
            this.formBase.email = datalist.email
            this.formBase.phone = datalist.phone
            this.formBase.username = datalist.username
            this.formBase.password = datalist.password
            this.formBase.avatar = datalist.avatar
            this.formBase.introduction = datalist.introduction
            this.formBase.permission_group_id = datalist.permission_group_id
            this.formBase.permission_group_title = datalist.permission_group_title
        })
    },
    // 表单提交
    createData() {
      this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$emit('handleCloseModal')
            if (this.formBase.id) {
                update(this.formBase).then(() => {
                    this.$emit('newDataes', this.formBase)
                })
            } else {
                add(this.formBase).then(() => {
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
  
  mounted: function () {
  },
  // 创建完毕状态
  created() {
    this.setupData()
  },
  // 组件更新
  updated: function() {
  }
}
</script>
<style>
.el-form--label-left .el-form-item__label{text-align: right;}
.el-dialog__footer{text-align: right;}
</style>
