<script setup lang="ts">
import { randomUUID, formatDateTime, changeArea, formatMoney } from '@/utils/index'
import { RefreshRight, Download } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'
import { ElNotification } from 'element-plus'
import { getDataModelDataApi } from '@/api/table'
import { type TableColumn, type ButtonList } from './types/index'
const { paginationData, handleSizeChange, handleCurrentChange } = usePagination({ pageSize: 15, pageSizes: [15, 30, 50, 100] })

const tableKey = randomUUID()

//  q:父组件传递过来的

/** Props配置 */
interface Props {
  /** 表格宽度 */
  tableWidth?: string | number
  /** 默认列宽 */
  defaultWidth?: string | number
  /** 是否有启用禁用按钮 */
  hasEnableDisable?: boolean
  /** 是否有编辑按钮 */
  hasEdit?: boolean
  /** 是否有序号 */
  hasIndex?: boolean
  /** 是否有选择框 */
  hasSelection?: boolean
  /** 是否有操作栏 */
  hasOperate?: boolean
  /** 是否有删除按钮 */
  hasDelete?: boolean
  /** 操作栏宽度 */
  operateWidth?: string | number
  /** 表格字段栏 */
  tableColumnList?: Array<TableColumn>
  /** 是否显示合计 */
  showSummary?: boolean
  /** 操作栏按钮 */
  buttonList?: Array<ButtonList>
  /** 数据模型 */
  dataModel?: string
  /** 查询条件 */
  queryWapper?: Record<string, any>
  /** 排序 */
  sortBy?: {
    sortKey: string
    sortOrder: 'asc' | 'desc'
  }
  /** 是否立即获取数据 */
  getDataModelListNow?: boolean
  /** 是否保留选择框选择 */
  reserveSelection?: boolean
  /** 表格上方是否有按钮 */
  hasTopButton?: boolean
  hasDownload?: boolean
  dataModelType?: string
}

const props = withDefaults(defineProps<Props>(), {
  tableWidth: '100%',
  defaultWidth: 'auto',
  hasEnableDisable: false,
  hasEdit: true,
  hasIndex: true,
  hasSelection: false,
  hasOperate: true,
  hasDelete: true,
  operateWidth: 200,
  showSummary: false,
  dataModel: '',
  sortBy: () => ({
    sortKey: 'created_at',
    sortOrder: 'desc'
  }),
  getDataModelListNow: true,
  reserveSelection: true,
  hasTopButton: true,
  hasDownload: false
})

const {
  defaultWidth,
  hasEnableDisable,
  hasEdit,
  hasIndex,
  hasDownload,
  hasSelection,
  hasOperate,
  hasDelete,
  operateWidth,
  tableColumnList,
  showSummary,
  buttonList,
  dataModel,
  queryWapper,
  sortBy,
  dataModelType,
  getDataModelListNow,
  reserveSelection
} = toRefs(props)

const emit = defineEmits(['selection-change', 'row-click', 'row-dblclick', 'getData', 'handleEdit', 'handleDelete', 'handleDisable', 'handleEnable'])
const loading = ref(false)
const tableData = ref<any>([])

/** 合计 */
const getSummaries = (param: any) => {
  const { columns, data } = param
  const sums: any = []
  columns.forEach((column: any, index: any) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map((item: any) => Number(item[column.property]))
    if (!values.every((value: number) => isNaN(value))) {
      sums[index] = values.reduce((prev: any, curr: any) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] += ' 元'
    } else {
      sums[index] = 'N/A'
    }
  })
  return sums
}
/** 选择框变化 */
const handleSelectionChange = (val: any) => {
  emit('selection-change', val)
}
/** 行点击 */
const handleRowClick = (row: any, column: any, event: any) => {
  // console.log(row, column, event)
}
/** 行双击 */
const handleRowDblclick = (row: any, column: any, event: any) => {
  // console.log(row, column, event)
}
/** 启用 */
const handleEnable = (row: any) => {
  console.log(row)
  emit('handleEnable', row)
}
/** 禁用 */
const handleDisable = (row: any) => {
  emit('handleDisable', row)
}
/** 编辑 */
const handleEdit = (row: any) => {
  emit('handleEdit', row)
}
/** 删除 */
const handleDelete = (row: any) => {
  emit('handleDelete', row)
}
/** 获取数据 */
const getDataModelList = () => {
  loading.value = true
  getDataModelDataApi(
    dataModel.value,
    {
      page: {
        pageNumber: paginationData.pageNumber,
        pageSize: paginationData.pageSize
      },
      ...queryWapper?.value
    },
    dataModelType?.value
  )
    .then(({ resultData, success }) => {
      if (!success) {
        ElNotification({
          title: '提示',
          message: '获取数据失败',
          type: 'error'
        })
        return
      }
      tableData.value = resultData.list
      paginationData.pageTotal = resultData.page.pageTotal
      paginationData.pageNumber = resultData.page.pageNumber
      paginationData.pageSize = resultData.page.pageSize
      emit('getData', resultData)
    })
    .catch((err: any) => {
      console.log(err)
    })
    .finally(() => {
      // setTimeout(() => {
      loading.value = false
      // }, 500)
    })
}
/** 转换百分比 */
const changePercent = (value: number | string) => {
  if (value === 0 || value === '0') {
    return '0%'
  } else if (+value > 0 && +value < 1) {
    return +value * 100 + '%'
  } else if (+value > 1) {
    return value
  } else {
    return ''
  }
}
/** 转换数组 */
const showArrayByModel = (arr: any[], model: string) => {
  if (arr instanceof Array) {
    return arr
      .filter(Boolean)
      .map((item) => {
        if (!item[model]) return
        return item[model]
      })
      .join(',')
  } else {
    return arr
  }
}
/** 转换地区 */
const getCodeToText = (value: any, model: string[]) => {
  return changeArea(value, model)
}
/** 下载表格 */
const handleDownload = () => {
  // const theader = tableColumnList?.value?.map((item: any) => {
  //   return {
  //     key: item.prop,
  //     title: item.label
  //   }
  // }) as any[]
  // exportJson2Excel(theader, tableData.value, dataModel.value)
}
/** 刷新表格 */
const handleRefresh = () => {
  getDataModelList()
}
/** 搜索 */
const handleSearch = () => {
  paginationData.pageNumber = 1
  getDataModelList()
}
/** 让父组件调用 */
defineExpose({
  getDataModelList,
  handleSearch,
  loading
})
const handleGetTableData = () => {
  if (getDataModelListNow.value) {
    getDataModelList()
  }
}
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const transformText = (text: string | undefined) => {
  if (text === undefined) return ''
  if (text.length > 10) return text.slice(0, 10) + '...'
  else return text
}

watch([() => paginationData.pageNumber, () => paginationData.pageSize], handleGetTableData, {
  immediate: true
})
</script>
<template>
  <el-card
    v-loading="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.4)"
    shadow="never"
  >
    <!-- Button -->
    <div v-if="hasTopButton" flex justify-between mb-20px>
      <div />
      <div>
        <el-tooltip content="导出" v-if="hasDownload">
          <el-button type="primary" :icon="Download" plain circle @click="handleDownload" />
        </el-tooltip>
        <el-tooltip content="刷新表格">
          <el-button type="primary" :icon="RefreshRight" plain circle @click="handleRefresh" />
        </el-tooltip>
      </div>
    </div>
    <!-- Table -->
    <div mb-20px class="height">
      <el-table
        :row-key="tableKey"
        ref="curdTable"
        highlight-current-row
        :data="tableData"
        height="100%"
        :show-summary="showSummary"
        :summary-method="getSummaries"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblclick"
      >
        <!-- 选择框 -->
        <el-table-column :reserve-selection="reserveSelection" v-if="hasSelection" type="selection" width="60" align="center" />

        <!-- 序号栏 -->
        <el-table-column v-if="hasIndex" type="index" width="55" align="center" label="序号" />

        <!-- 操作栏 -->
        <el-table-column fixed="right" v-if="hasOperate" :width="operateWidth + 'px'" align="center" label="操作">
          <template #default="{ row }">
            <el-button text bg size="small" v-if="hasEdit" type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button
              text
              bg
              size="small"
              v-if="hasEnableDisable"
              :type="row.enable === 'n' ? 'success' : 'danger'"
              @click="row.enable === 'n' ? handleEnable(row) : handleDisable(row)"
            >
              {{ row.enable === 'n' ? '启用' : '禁用' }}
            </el-button>
            <el-button v-if="hasDelete" type="danger" text bg size="small" @click="handleDelete(row)"> 删除 </el-button>
            <el-button
              v-for="(btn, index) in buttonList"
              :key="index"
              text
              bg
              size="small"
              :disabled="btn.disabled"
              :type="btn.type"
              :icon="btn.icon"
              @click="btn.click(row)"
              >{{ btn.label }}</el-button
            >
          </template>
        </el-table-column>

        <!-- 字段栏 -->
        <el-table-column
          v-for="(key, index) in tableColumnList"
          :key="index"
          :width="key.width ? key.width : defaultWidth"
          align="center"
          :label="key.label"
          :property="key.prop"
        >
          <template #default="{ row }">
            <el-tag v-if="key.type === 'bool'" size="small" :type="row[key.prop] === 'y' ? '' : 'danger'">{{ row[key.prop] === 'y' ? '是' : '否' }}</el-tag>
            <span v-else-if="key.type === 'area'">
              {{ getCodeToText(null, row[key.prop] && JSON.parse(row[key.prop])) }}
            </span>
            <span v-else-if="key.type === 'object' && row[key.prop]">
              {{ key.model ? row[key.prop][key.model] : row[key.prop] }}
            </span>
            <span v-else-if="key.type === 'date'">{{ formatDateTime(row[key.prop], key.model) }}</span>
            <span v-else-if="key.type === 'array' && key.model">{{ showArrayByModel(row[key.prop], key.model) }}</span>
            <el-tag v-else-if="key.type === 'array'" type="success" style="margin: 5px" v-for="(item, index) in row[key.prop]" :key="index">{{ item }}</el-tag>
            <span v-else-if="key.type === 'money'"> {{ formatMoney(row[key.prop]) }}</span>
            <span v-else-if="key.type === 'percent'"> {{ changePercent(row[key.prop]) }}</span>
            <el-tag v-else-if="key.type === 'tag'" size="small" :type="key.tagType">{{ row[key.prop] }}</el-tag>
            <span v-else-if="key.type === 'text'">
              <el-tooltip placement="top" :content="row[key.prop]">
                {{ transformText(row[key.prop]) }}
              </el-tooltip>
            </span>
            <span v-else>{{ row[key.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div flex justify-end>
      <el-pagination
        background
        :layout="paginationData.layout"
        :page-sizes="paginationData.pageSizes"
        :total="paginationData.pageTotal"
        :page-size="paginationData.pageSize"
        :currentPage="paginationData.pageNumber"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.height {
  height: calc(100vh - 400px);
}
</style>
