<script setup lang="ts">
defineOptions({
  name: 'UserLog'
})

const searchData = reactive({
  info: '',
  type: ''
})

const table = ref<any>()

const tableColumnList = [
  { label: '日志内容', prop: 'info' },
  { label: '日志类别', prop: 'type' },
  { label: '创建时间', prop: 'create_time', type: 'date' }
]

/** 搜索 */
const handleSearch = () => {
  table.value?.handleSearch()
}

/** 查询条件 */
const queryWapper = computed(() => {
  return {
    log: {
      info: searchData.info,
      type: searchData.type
    }
  }
})

const logTypeList = ref<Array<{ label: string; value: string }>>([])

const getTableData = ({ typeList }: any) => {
  logTypeList.value = typeList.map((item: string) => {
    return {
      label: item,
      value: item
    }
  })
}

const handleReset = async () => {
  searchData.info = ''
  searchData.type = ''
  await nextTick()
  table.value?.handleSearch()
}

const searchItems = [
  { field: 'info', type: 'input', placeholder: '日志内容' },
  { field: 'type', type: 'select', placeholder: '日志类型', options: [] as Array<{ label: string; value: string }> },
  { type: 'button', text: '搜索', click: handleSearch, buttonType: 'primary' },
  { type: 'button', text: '重置', click: handleReset, buttonType: 'info' }
]

watch([logTypeList], () => {
  searchItems.find((item) => item.field === 'type')!.options = logTypeList.value
})
</script>

<template>
  <div p-20px>
    <Table
      mt-20px
      ref="table"
      :tableColumnList="tableColumnList"
      dataModel="UserAdminister"
      dataModelType="QueryAllLog"
      :queryWapper="queryWapper"
      :hasOperate="false"
      @getData="getTableData"
      :operateWidth="200"
    >
      <template #searchForm>
        <Search :searchItems="searchItems" :searchData="searchData" />
      </template>
    </Table>
  </div>
</template>
