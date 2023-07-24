<script setup lang="ts">
import { resetSystemConfigApi, SystemConfigResponseData } from '@/api/system-config'
import SystemConfigDialog from './dialog.vue'
import { type SearchItem } from 'types/common'
defineOptions({
  name: 'SystemConfig'
})

const searchData = reactive({
  info: ''
})

const table = ref<any>()
const formData = ref<Record<string, any>>({})

const currentUpdateId = ref<undefined | string>(undefined)
const dialogVisible = ref<boolean>(false)

const tableColumnList = [
  { label: '配置描述', prop: 'info', width: '200px' },
  { label: '配置关键词', prop: 'key', width: '200px' },
  { label: '配置值', prop: 'value', width: '200px' },
  { label: '创建时间', prop: 'create_time', type: 'date' },
  { label: '最后修改时间', prop: 'lastupdate_time', type: 'date' }
]

/** 搜索 */
const handleSearch = () => {
  table.value?.handleSearch()
}

/** 重置 */
const handleReset = async () => {
  searchData.info = ''
  await nextTick()
  table.value?.handleSearch()
}

/** 恢复默认设置 */
const handleResetDefault = () => {
  ElMessageBox.confirm('此操作将恢复默认设置, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      table.value.loading = true
      resetSystemConfigApi()
        .then(() => {
          table.value?.handleSearch()
        })
        .finally(() => {
          table.value.loading = false
        })
    })
    .catch((e) => {
      console.log(e)
      if (e === 'cancel') ElMessage.info('已取消重置')
    })
}

/** 新建 */
const handleCreate = () => {
  // dialogVisible.value = true
  // console.log('create')
  ElNotification({
    title: '提示',
    message: '暂不支持新增系统配置',
    type: 'warning'
  })
  return
}

/** 查询条件 */
const queryWapper = computed(() => {
  return {
    system_config: {
      info: searchData.info
    }
  }
})

/** 点击编辑按钮 */
const handleEdit = (data: any) => {
  dialogVisible.value = true
  currentUpdateId.value = data.scid
  formData.value = JSON.parse(JSON.stringify(data))
}

const refreshTable = () => {
  table.value?.getDataModelList()
}

const searchItems: SearchItem[] = [
  { field: 'info', type: 'input', placeholder: '配置描述' },
  { type: 'button', text: '搜索', click: handleSearch, buttonType: 'primary' },
  { type: 'button', text: '重置', click: handleReset, buttonType: 'info' },
  { type: 'button', text: '恢复默认设置', click: handleResetDefault, buttonType: 'warning' },
  { type: 'button', text: '新建', click: handleCreate, buttonType: 'success' }
]
</script>

<template>
  <div p-20px>
    <Table
      mt-20px
      ref="table"
      :tableColumnList="tableColumnList"
      dataModel="SystemConfig"
      :queryWapper="queryWapper"
      :hasDelete="false"
      :operateWidth="200"
      @handleEdit="handleEdit"
    >
      <template #searchForm>
        <Search :searchItems="searchItems" :searchData="searchData" />
      </template>
    </Table>

    <SystemConfigDialog @update:table="refreshTable" v-model:updateId="currentUpdateId" v-model:visible="dialogVisible" v-model="formData" />
  </div>
</template>
