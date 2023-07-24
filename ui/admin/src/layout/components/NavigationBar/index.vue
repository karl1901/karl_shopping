<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { useUserStore } from '@/store/modules/user'
import Breadcrumb from '../Breadcrumb/index.vue'
import Hamburger from '../Hamburger/index.vue'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import Notify from '@/components/Notify/index.vue'
import { ElMessage } from 'element-plus'
import { useFullscreenLoading } from '@/hooks/useFullscreenLoading'
import { UpdateType } from '@/enum/user'
import { logOffUserApi } from '@/api/user'

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const title = ref<string>('')
const show = ref<boolean>(false)
const updateType = ref<UpdateType>(UpdateType.PWD)

const sidebar = computed(() => {
  return appStore.sidebar
})
const showNotify = computed(() => {
  return settingsStore.showNotify
})
const showThemeSwitch = computed(() => {
  return settingsStore.showThemeSwitch
})
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})

const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}
const options = {
  text: '退出登录中...'
}

const logout = async () => {
  await useFullscreenLoading(userStore.logout, options)()
  router.push('/login')
}

const updatePwd = () => {
  title.value = '修改密码'
  updateType.value = UpdateType.PWD
  show.value = true
}

const updateUserInfo = () => {
  title.value = '修改用户附加信息'
  updateType.value = UpdateType.USER_INFO
  show.value = true
}

const updateUserEmailInfo = () => {
  title.value = '修改用户邮箱信息'
  updateType.value = UpdateType.EMAIL
  show.value = true
}

const viewUserFace = () => {
  title.value = '查看用户人脸信息'
  updateType.value = UpdateType.VIEW_FACE
  show.value = true
}

// 注销
const logoff = () => {
  ElMessageBox.confirm('此操作将注销当前用户, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      logOffUserApi().then(() => {
        router.push('/login')
        useUserStore().resetState()
      })
    })
    .catch((e) => {
      console.log(e)
      if (e === 'cancel') ElMessage.info('已取消注销')
    })
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar
            :src="
              userStore.userInfo?.avatar_url ? userStore.userInfo?.avatar_url : 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=500'
            "
            :size="30"
          />
          <span>{{ userStore.userInfo?.nickname }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="updatePwd">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="updateUserInfo">
              <span style="display: block">修改资料</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="updateUserEmailInfo">
              <span style="display: block">修改邮箱信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="viewUserFace">
              <span style="display: block">人脸信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logoff">
              <span style="display: block">注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <Update :title="title" v-model="show" :updateType="updateType" />
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
