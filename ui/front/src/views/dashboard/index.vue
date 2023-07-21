<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

type CurrentRoleType = 'user' | 'admin'

const userStore = useUserStore()
const currentRole = ref<CurrentRoleType>('admin')
if (!userStore.roles.includes('admin')) {
  currentRole.value = 'user'
}
</script>

<template>
  <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
</template>
