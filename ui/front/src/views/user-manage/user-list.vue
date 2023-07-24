<script setup lang="ts">
import { type UserData } from '@/api/login'
import { bannedUserApi, sendMessageApi } from '@/api/admin'
import Editor from '@/components/WangEditor/index.vue'

defineOptions({
  name: 'UserList'
})

const searchData = reactive({
  queryStr: ''
})

const table = ref<any>()

const tableColumnList = [
  { label: '昵称', prop: 'nickname', width: 200 },
  { label: '用户名', prop: 'uname', width: 200 },
  { label: '性别', prop: 'sex', type: 'tag' },
  { label: '邮箱', prop: 'mail', width: 200 },
  { label: '微信', prop: 'wx', width: 200 },
  { label: 'QQ', prop: 'qq', width: 200 },
  { label: '个性签名', prop: 'signature', width: 300 },
  { label: '角色', prop: 'role', type: 'tag' },
  { label: '是否启用', prop: 'enable', type: 'bool' },
  { label: '启用/禁用原因', prop: 'cause', width: 300, type: 'text' },
  { label: '密码', prop: 'pwd', width: 300 },
  { label: '密码盐', prop: 'salt' },
  { label: '注册时间', prop: 'reg_time', type: 'date', width: 200 },
  { label: '最后登录时间', prop: 'lastdoing_time', type: 'date', width: 200 }
]

/** 搜索 */
const handleSearch = () => {
  table.value?.handleSearch()
}

/** 查询条件 */
const queryWapper = computed(() => {
  return {
    queryStr: searchData.queryStr
  }
})

const getTableData = ({ list }: any) => {
  list.forEach((item: UserData) => {
    item.sex = UserSex[item.sex?.toUpperCase() as keyof typeof UserSex] || '暂无性别'
    item.role = UserRole[item.role.toUpperCase() as keyof typeof UserRole]
  })
}

const handleDisable = (row: UserData) => {
  ElMessageBox.prompt('请输入禁用原因', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{1,100}$/,
    inputErrorMessage: '禁用原因长度不能超过100个字符'
  })
    .then(({ value }) => {
      bannedUserApi({ user: { uid: row.uid, cause: value, enable: 'n' } })
        .then(() => {
          ElNotification({
            title: '提示',
            message: '禁用成功',
            type: 'success'
          })
          table.value?.handleSearch()
        })
        .catch((e) => {
          console.log(e)
        })
    })
    .catch(() => {
      ElNotification({
        title: '提示',
        message: '取消禁用',
        type: 'error'
      })
    })
}

const handleEnable = (row: UserData) => {
  ElMessageBox.prompt('请输入启用原因', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{1,100}$/,
    inputErrorMessage: '启用原因长度不能超过100个字符'
  })
    .then(({ value }) => {
      bannedUserApi({ user: { uid: row.uid, cause: value, enable: 'y' } })
        .then(() => {
          ElNotification({
            title: '提示',
            message: '启用成功',
            type: 'success'
          })
          table.value?.handleSearch()
        })
        .catch((e) => {
          console.log(e)
        })
    })
    .catch(() => {
      ElNotification({
        title: '提示',
        message: '取消启用',
        type: 'error'
      })
    })
}

const showMsgDialog = (row: UserData) => {
  console.log(row)
  dialogVisible.value = true
  formData.acceptid = row.uid
}

const dialogVisible = ref(false)
const editor = ref<any>()
const loading = ref(false)

const formData = reactive({
  acceptid: -999,
  info: '<p><br></p>',
  title: ''
})

const handleDialogClose = () => {
  dialogVisible.value = false
  formData.acceptid = -999
  formData.info = '<p><br></p>'
  formData.title = ''
  editor.value?.clearEditor()
}

const handleSendMsg = () => {
  if (formData.acceptid === -999) {
    ElMessage.error('你给谁发呢？小老弟')
    return
  }
  if (formData.title === '') {
    ElMessage.error('请输入标题')
    return
  }
  if (formData.info === '<p><br></p>') {
    ElMessage.error('请输入内容')
    return
  }
  loading.value = true
  sendMessageApi({ userMessage: { ...formData } })
    .then(() => {
      ElNotification({
        title: '提示',
        message: '发送成功',
        type: 'success'
      })
      handleDialogClose()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      loading.value = false
    })
}

const handleReset = async () => {
  searchData.queryStr = ''
  await nextTick()
  table.value?.handleSearch()
}

const searchItems: SearchItem[] = [
  { field: 'queryStr', type: 'input', placeholder: '用户名/昵称/邮箱/qq/微信' },
  { type: 'button', text: '搜索', click: handleSearch, buttonType: 'primary' },
  { type: 'button', text: '重置', click: handleReset, buttonType: 'info' }
]
</script>

<template>
  <div p-20px>
    <Table
      mt-20px
      ref="table"
      :tableColumnList="tableColumnList"
      dataModel="UserAdminister"
      dataModelType="QueryAllUser"
      :queryWapper="queryWapper"
      :hasEdit="false"
      :hasDelete="false"
      @getData="getTableData"
      hasEnableDisable
      @handleDisable="handleDisable"
      :buttonList="[
        {
          label: '发送消息',
          type: 'primary',
          click: showMsgDialog
        }
      ]"
      @handleEnable="handleEnable"
      :operateWidth="200"
    >
      <template #searchForm>
        <Search :searchItems="searchItems" :searchData="searchData" />
      </template>
    </Table>

    <el-dialog style="height: 100%" @closed="handleDialogClose" title="发送消息" v-model="dialogVisible" append-to-body top="8vh">
      <div v-loading="loading">
        <el-form :model="formData">
          <el-form-item>
            <el-input v-model="formData.title" placeholder="消息标题" />
          </el-form-item>
          <el-form-item>
            <Editor ref="editor" :config="{ height: 200 }" v-model="formData.info" />
          </el-form-item>
        </el-form>

        <div flex justify-end>
          <el-button @click="handleDialogClose">取 消</el-button>
          <el-button type="primary" @click="handleSendMsg">发 送</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
