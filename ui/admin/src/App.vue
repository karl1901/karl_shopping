<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCn
const config = reactive({
  max: 1
})
</script>

<template>
  <ElConfigProvider :locale="locale" :message="config">
    <router-view />
  </ElConfigProvider>
</template>
