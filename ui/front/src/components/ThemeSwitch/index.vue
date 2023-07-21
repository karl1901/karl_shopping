<script lang="ts" setup>
import { type ThemeName, useTheme } from '@/hooks/useTheme'
import { DesktopOutlined } from '@ant-design/icons-vue'

const { themeList, activeThemeName, setTheme } = useTheme()

const handleSetTheme = ({ item }: any) => {
  setTheme(item.title)
}
</script>

<template>
  <div>
    <a-dropdown trigger="click">
      <a-tooltip effect="dark" title="主题颜色" placement="topRight">
        <DesktopOutlined :style="{ fontSize: '24px', color: '#08c' }" />
      </a-tooltip>

      <template #overlay>
        <a-menu @click="handleSetTheme">
          <a-menu-item v-for="theme in themeList" :key="theme.name" :disabled="activeThemeName === theme.name" :title="theme.name">
            <span>{{ theme.title }}</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
