<script lang="ts" setup>
import { User, Lock, Message } from '@element-plus/icons-vue'
import { type LoginRequestData, registerApi, type RegisterRequestData, checkFaceApi } from '@/api/login'
import { getMD5, getBase64Image } from '@/utils/index'
import Return from '@/icons/svg/return.svg?component'

const router = useRouter()
const hasLogin = ref(false)

// 登录按钮 Loading
const loading = ref(false)
// 是否是登录页面
const isLogin = ref(true)
// 是否是普通登录
const currentType = ref(0)

// 登录表单数据
const loginForm = reactive<LoginRequestData>({
  user: {
    uname: '',
    pwd: ''
  },
  imageCode: '',
  address: '',
  mailCode: '',
  uid: -1
})
const regForm = reactive<RegisterRequestData>({
  user: {
    uname: '',
    pwd: ''
  },
  address: '',
  imageCode: '',
  mailCode: ''
})

const resetRegForm = () => {
  regForm.user.uname = ''
  regForm.user.pwd = ''
  regForm.address = ''
  regForm.imageCode = ''
  regForm.mailCode = ''
}

const imageCodeRefLogin = ref<any>()
const imageCodeRefReg = ref<any>()

/** 登录逻辑 */
const handleLogin = () => {
  if (currentType.value === 0) {
    if (loginForm.user.uname === '') return ElMessage.warning('请输入用户名！')
    if (loginForm.user.pwd === '') return ElMessage.warning('请输入密码！')
    if (loginForm.imageCode === '') return ElMessage.warning('请输入图片验证码！')
    loading.value = true
    useUserStore()
      .login({
        imageCode: loginForm.imageCode,
        user: {
          uname: loginForm.user.uname,
          pwd: getMD5(loginForm.user.pwd)
        }
      })
      .then(() => {
        router.push({ path: '/' })
      })
      .catch((e) => {
        console.log(e)
        if (e.includes('密码')) loginForm.user.pwd = ''
        else if (e.includes('登录名')) loginForm.user.uname = ''
        else if (e.includes('验证码')) {
          loginForm.imageCode = ''
          imageCodeRefLogin.value?.sendImageCode()
        } else {
          loginForm.imageCode = ''
          loginForm.user.pwd = ''
          loginForm.user.uname = ''
        }
      })
      .finally(() => {
        loading.value = false
      })
  } else if (currentType.value === 1) {
    console.log(loginForm.address === '', /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(loginForm.address))
    if (loginForm.address === '' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(loginForm.address)) return ElMessage.warning('请输入正确的邮箱！')
    if (loginForm.mailCode === '') return ElMessage.warning('请输入邮箱验证码！')
    loading.value = true
    useUserStore()
      .loginByEmail({
        address: loginForm.address,
        mailCode: loginForm.mailCode
      })
      .then(() => {
        router.push({ path: '/' })
      })
      .catch((e) => {
        console.log(e)
        if (e.includes('邮箱')) loginForm.address = ''
        if (e.includes('验证码')) loginForm.mailCode = ''
      })
      .finally(() => {
        loading.value = false
      })
  } else if (currentType.value === 2) {
    console.log('人脸登录')
    if (loginForm.uid === -1) return ElMessage.warning('请先进行人脸识别！')
    loading.value = true
    useUserStore()
      .loginByUserFace(loginForm.uid)
      .then(() => {
        hasLogin.value = true
        router.push({ path: '/' })
      })
      .catch((e) => {
        hasLogin.value = false
        console.log(e)
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    console.log('暂无此登录方式')
  }
}
/** 注册逻辑 */
const handleRegister = () => {
  if (regForm.user.uname === '') return ElMessage.warning('请输入用户名！')
  if (regForm.user.pwd === '') return ElMessage.warning('请输入密码！')
  if (regForm.address === '' || !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(regForm.address)) return ElMessage.warning('请输入正确的邮箱！')
  if (regForm.mailCode === '') return ElMessage.warning('请输入邮箱验证码！')
  if (regForm.imageCode === '') return ElMessage.warning('请输入图片验证码！')
  loading.value = true
  registerApi({
    ...regForm,
    user: {
      ...regForm.user,
      pwd: getMD5(regForm.user.pwd)
    }
  })
    .then((res) => {
      console.log(res)
      isLogin.value = !isLogin.value
      resetRegForm()
    })
    .catch((e) => {
      if (e.includes('密码')) regForm.user.pwd = ''
      if (e.includes('登录名')) regForm.user.uname = ''
      if (e.includes('图片')) {
        regForm.imageCode = ''
        imageCodeRefReg.value?.sendImageCode()
      }
      if (e.includes('邮箱')) regForm.mailCode = ''
    })
    .finally(() => {
      loading.value = false
    })
}

/** 手机号登录 */
const handleLoginByPhone = () => {
  ElMessage.warning('暂未开放此功能！')
}
/** 邮箱登录 */
const handleLoginByEmail = () => {
  ElMessage.warning('暂未开放此功能！')
}

const handleChange = () => {
  isLogin.value = !isLogin.value
}

const handleSubmit = () => {
  isLogin.value ? handleLogin() : handleRegister()
}

const handleBackPass = () => {
  ElMessage.error('密码都能忘记，你还是换个账号吧！')
  setTimeout(() => {
    ElMessage.error('别惊讶，只是懒得做这个功能！')
  }, 4000)
}

type UserFaceInfo = {
  uid: number
  nickname: string
  content: string
  avatar_url: string
}

const userFaceInfoList = ref<UserFaceInfo[]>([])
const loadingVideo = ref(false)
const handleCheckUserFace = () => {
  const video = document.querySelector('#video') as HTMLVideoElement
  const content = getBase64Image(video).split(',')[1]
  loadingVideo.value = true
  checkFaceApi({
    userFace: { content }
  })
    .then((res) => {
      userFaceInfoList.value = res.resultData.userFaceInfoList
      handleCloseVideo()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      loadingVideo.value = false
    })
}

watch(
  () => currentType.value,
  (val) => {
    userFaceInfoList.value = []
    handleCloseVideo()
    if (val === 2) {
      handleGetVideo()
    }
  }
)

const chooseUserFace = (uid: number) => {
  loginForm.uid = uid
  // 登录
  handleLogin()
}

const getUserNickName = () => {
  return userFaceInfoList.value.find((item) => item.uid === loginForm.uid)?.nickname
}

// 获取摄像头
const handleGetVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      const video = document.querySelector('#video') as HTMLVideoElement
      console.log(video)
      video.srcObject = stream
      video.play()
    })
    .catch((err) => {
      console.log('获取摄像头失败，请检查设备是否有摄像头!', err)
      ElMessage.error('获取摄像头失败，请检查设备是否有摄像头!')
      setTimeout(() => {
        currentType.value = 1
      }, 2000)
    })
}

// 关闭摄像头
const handleCloseVideo = () => {
  const video = document.querySelector('#video') as HTMLVideoElement
  if (!video) return
  const stream = video.srcObject as MediaStream
  if (!stream) return
  const tracks = stream.getTracks()
  tracks.forEach((track) => {
    track.stop()
  })
  video.srcObject = null
}

const handleReturn = () => {
  userFaceInfoList.value = []
  handleGetVideo()
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div flex justify-center items-center h-150px>
        <img h-full rounded-full src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=500" />
      </div>
      <div class="content">
        <!-- 登录表单 -->
        <el-form v-loading="loading" size="large" v-if="isLogin" ref="loginFormRef" :show-message="false" :model="loginForm" @keyup.enter="handleLogin">
          <!-- 账号密码登录 -->
          <el-form-item prop="user.uname" v-if="currentType === 0">
            <el-input v-model.trim="loginForm.user.uname" clearable placeholder="用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="user.pwd" v-if="currentType === 0">
            <el-input v-model.trim="loginForm.user.pwd" clearable placeholder="密码" type="password" :prefix-icon="Lock" show-password />
          </el-form-item>
          <ImageCode ref="imageCodeRefLogin" v-model.trim="loginForm.imageCode" v-if="currentType === 0" />

          <!-- 邮箱登录 -->
          <el-form-item prop="address" v-if="currentType === 1">
            <el-input v-model.trim="loginForm.address" clearable placeholder="邮箱" :prefix-icon="User" />
          </el-form-item>

          <CodeSend v-if="currentType === 1" :type="2" v-model:mailCode.trim="loginForm.mailCode" v-model:address.trim="loginForm.address" />

          <!-- 人脸识别 -->
          <el-form-item v-if="currentType === 2">
            <div v-if="userFaceInfoList.length" class="user-face-info-list">
              <div v-if="hasLogin">亲爱的的用户{{ getUserNickName() }}，您好，您已成功登录，请稍等</div>
              <div v-else>
                <div @click="chooseUserFace(item.uid)" class="user-face-info" v-for="item in userFaceInfoList" :key="item.uid">
                  <div>
                    <img :src="item.avatar_url ? item.avatar_url : 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=500'" />
                  </div>
                  <div class="user-face-info-nickname">{{ item.nickname }}</div>
                </div>
              </div>
            </div>

            <div v-else flex justify-center items-center w-full>
              <div class="video" v-loading="loadingVideo" element-loading-text="人脸识别中,请稍等...">
                <video id="video" />
              </div>
            </div>
          </el-form-item>
        </el-form>

        <!-- 注册表单 -->
        <el-form size="large" v-else ref="regFormRef" :model="regForm" @keyup.enter="handleRegister">
          <el-form-item prop="user.uname">
            <el-input v-model.trim="regForm.user.uname" clearable placeholder="用户名" :prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="user.pwd">
            <el-input v-model.trim="regForm.user.pwd" clearable placeholder="密码" type="password" :prefix-icon="Lock" show-password />
          </el-form-item>
          <el-form-item prop="address">
            <el-input v-model.trim="regForm.address" clearable placeholder="邮箱" :prefix-icon="Message" />
          </el-form-item>
          <CodeSend :type="1" v-model:mailCode.trim="regForm.mailCode" v-model:address.trim="regForm.address" />
          <ImageCode ref="imageCodeRefReg" v-model.trim="regForm.imageCode" />
        </el-form>
        <el-button :loading="loadingVideo" size="large" type="primary" v-if="currentType === 2 && userFaceInfoList.length === 0" @click="handleCheckUserFace">
          校验人脸
        </el-button>
        <el-button :loading="loading" v-if="currentType !== 2" size="large" type="primary" @click="handleSubmit">
          {{ isLogin ? '登 录' : '注 册' }}
        </el-button>
        <div style="display: flex; justify-content: center; margin-top: 16px">
          <el-link @click.prevent="handleChange" v-if="currentType !== 2">
            {{ isLogin ? '还没有账号？立即前往注册' : '已有账号？立即前往登录' }}
          </el-link>
          <el-link class="ml-20" v-if="isLogin && currentType === 0" @click.prevent="handleBackPass">忘记密码？</el-link>
        </div>
      </div>

      <div class="footer" v-if="isLogin">
        <el-icon v-if="currentType === 1 || currentType === 2" @click="currentType = 0"><User /></el-icon>
        <el-icon v-if="currentType === 0 || currentType === 2" @click="currentType = 1"><Message /></el-icon>
        <el-icon v-if="currentType === 1 || currentType === 0" @click="currentType = 2"><VideoCamera /></el-icon>
        <el-icon v-if="currentType === 2" @click="handleReturn"><RefreshLeft /></el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .user-face-info-list {
    overflow: hidden;
    width: 100%;
    > div {
      height: 200px;
      width: 100%;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      &::-webkit-scrollbar {
        width: 0;
      }

      .user-face-info {
        width: 100px;
        height: 120px;
        margin: 10px;
        cursor: pointer;
        border-radius: 15px;
        transition: all 0.3s;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:hover {
          box-shadow: 0 0 10px #409eff;
          transform: scale(1.1);
        }

        > div:nth-child(1) {
          width: 100%;
          height: 100px;
          box-shadow: 0 0 10px #dcdfe6;
          border-radius: 15px;

          img {
            width: 20px;
            border-radius: 15px;
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        .user-face-info-nickname {
          font-size: 12px;
          color: #606266;
          overflow: hidden;
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          line-height: 2;
        }
      }
    }
  }
  .video {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
    overflow: hidden;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        border-radius: 50%;
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      border-top: 1px solid #ebeef5;
      :deep(.el-icon) {
        padding: 0;
        margin: 0 10px;
        color: #409eff;
        font-size: 20px;
        :hover {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
