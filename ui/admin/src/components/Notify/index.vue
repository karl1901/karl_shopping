<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'
import NotifyList from './NotifyList.vue'
import { type IListItem, notifyData, messageData, todoData } from './data'

type TabNameType = '通知' | '消息' | '待办'

interface IDataItem {
  name: TabNameType
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  list: IListItem[]
}

/** 角标当前值 */
const badgeValue = computed(() => {
  return data.value.reduce((prev, cur) => prev + cur.list.length, 0)
})
/** 角标最大值 */
const badgeMax = 99
/** 面板宽度 */
const popoverWidth = 350
/** 当前 Tab */
const activeName = ref<TabNameType>('通知')
/** 所有数据 */
const data = ref<IDataItem[]>([
  // 通知数据
  {
    name: '通知',
    type: 'primary',
    list: notifyData
  },
  // 消息数据
  {
    name: '消息',
    type: 'danger',
    list: messageData
  },
  // 待办数据
  {
    name: '待办',
    type: 'warning',
    list: todoData
  }
])

const loading = ref(false)

const handleHistory = () => {
  ElMessage.success(`跳转到${activeName.value}历史页面`)
}

const handleClear = () => {
  if (data.value.find((item) => item.name === activeName.value)?.list.length === 0) {
    ElMessage.error('当前没有数据')
    return
  }
  loading.value = true
  const randomNum = Math.random()
  setTimeout(() => {
    if (randomNum > 0.5) {
      ElMessage.success('清除成功')
      data.value.forEach((item) => {
        if (item.name === activeName.value) {
          item.list = []
        }
      })
    } else {
      ElMessage.error('清除失败')
    }
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <el-tooltip effect="dark" content="消息通知" placement="bottom">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch>
          <el-tab-pane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge :value="item.list.length" :max="badgeMax" :type="item.type" />
            </template>
            <el-scrollbar height="400px" v-loading="loading">
              <NotifyList :list="item.list" />
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <div class="notify-history">
          <el-button link @click="handleHistory">查看{{ activeName }}历史</el-button>
          <el-button link @click="handleClear">清除{{ activeName }}记录</el-button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
