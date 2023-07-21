<script setup lang="ts">
import { updatePwdApi, updateUserInfoApi, updateUserEmailApi, queryUserFaceApi, addUserFaceApi, updateUserFaceApi, delUserFaceApi } from '@/api/user'
import { getMD5 } from '@/utils/index'
import { UpdateType } from '@/enum/user'
import { useUserStore } from '@/store/modules/user'
import { getBase64Image } from '@/utils'
import { message } from 'ant-design-vue'

const userStore = useUserStore()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '修改信息'
  },
  updateType: {
    type: String,
    default: UpdateType.PWD
  }
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const userInfo = computed(() => {
  return reactive(Object.assign({}, userStore.userInfo))
})

const loading = ref<boolean>(false)
const loadingFace = ref<boolean>(false)
const faceDialogVisible = ref<boolean>(false)

const ruleForm = reactive({
  pwd: ''
})

const handleClose = () => {
  dialogVisible.value = false
  ruleForm.pwd = ''
  userStore.getUserInfo()
}

const submitPwd = () => {
  if (ruleForm.pwd === '') {
    message.error('请输入新密码')
    return
  }
  loading.value = true
  updatePwdApi({ user: { pwd: getMD5(ruleForm.pwd) } })
    .then(() => {
      handleClose()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      loading.value = false
    })
}

const submitUserInfo = () => {
  // 校验qq和微信
  if (userInfo.value.qq === '' || !/^[1-9][0-9]{4,10}$/.test(userInfo.value.qq as string)) {
    message.error('请输入正确的qq号')
    return
  }
  if (userInfo.value.wx === '' || !/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(userInfo.value.wx as string)) {
    message.error('请输入正确的微信号')
    return
  }
  loading.value = true
  updateUserInfoApi({
    user: {
      nickname: userInfo.value.nickname,
      signature: userInfo.value.signature,
      qq: userInfo.value.qq,
      wx: userInfo.value.wx,
      sex: userInfo.value.sex,
      avatar_url: 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=350'
    }
  })
    .then(() => {
      handleClose()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      loading.value = false
    })
}

const submitEmailInfo = () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (userInfo.value.mail === '' || !reg.test(userInfo.value.mail)) {
    message.error('请输入正确的邮箱')
    userInfo.value.mail = ''
    return
  }

  loading.value = true
  updateUserEmailApi({ user: { mail: userInfo.value.mail } })
    .then((res) => {
      console.log(res)
      if (!res.success) {
        message.error(res.message)
        return
      }
      message.success(res.message)
      handleClose()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      loading.value = false
    })
}

const handleSubmit = () => {
  if (props.updateType === UpdateType.PWD) {
    submitPwd()
  } else if (props.updateType === UpdateType.USER_INFO) {
    submitUserInfo()
  } else if (props.updateType === UpdateType.EMAIL) {
    submitEmailInfo()
  } else {
    ElNotification.error({
      title: '提示',
      message: '您点了啥？'
    })
  }
}

const userFace = ref({
  content: '',
  ufid: -1,
  uid: -1
})

const queryUserFace = () => {
  loading.value = true
  queryUserFaceApi()
    .then((res) => {
      userFace.value = res.resultData.userFace
    })
    .catch(() => {
      userFace.value = {
        content: '',
        ufid: -1,
        uid: -1
      }
    })
    .finally(() => {
      loading.value = false
    })
}

watch(
  () => props.updateType,
  (val) => {
    if (val === UpdateType.VIEW_FACE) {
      queryUserFace()
    }
  },
  {
    immediate: true
  }
)

const handleOpenFaceDialog = () => {
  faceDialogVisible.value = true
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      const video = document.querySelector('#faceVideo') as HTMLVideoElement
      video.srcObject = stream
      video.play()
    })
    .catch((err) => {
      console.log('获取摄像头失败，请检查设备是否有摄像头!', err)
    })
}

const handleCloseFaceDialog = () => {
  faceDialogVisible.value = false
  const video = document.querySelector('#faceVideo') as HTMLVideoElement
  video.srcObject = null
  queryUserFace()
}

const handleFaceSubmit = () => {
  const video = document.querySelector('#faceVideo') as HTMLVideoElement
  const content = getBase64Image(video).split(',')[1]
  loadingFace.value = true
  if (userFace.value.ufid === -1) {
    addUserFaceApi({ userFace: { content } })
      .then(() => {
        handleCloseFaceDialog()
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        loadingFace.value = false
      })
  } else {
    updateUserFaceApi({ userFace: { content, ufid: userFace.value.ufid } })
      .then(() => {
        handleCloseFaceDialog()
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        loadingFace.value = false
      })
  }
}

const handleDelUserFace = () => {
  loading.value = true
  delUserFaceApi({ userFace: { ufid: userFace.value.ufid } })
    .then(() => {
      queryUserFace()
    })
    .catch((e) => {
      console.log(e)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <el-dialog
    :close-on-click-modal="false"
    v-model.trim="dialogVisible"
    width="30%"
    align-center
    :title="title"
    append-to-body
    :show-close="false"
    :close-on-press-escape="false"
  >
    <div v-loading="loading">
      <div flex justify-center items-center>
        <el-form v-if="updateType === UpdateType.PWD" @keyup.enter="handleSubmit" :model="ruleForm">
          <el-form-item label="新密码" prop="pwd">
            <el-input autofocus v-model.trim="ruleForm.pwd" clearable type="password" />
          </el-form-item>
        </el-form>

        <el-form v-if="updateType === UpdateType.USER_INFO" @keyup.enter="handleSubmit" :model="userInfo" label-width="100px">
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model.trim="userInfo.nickname" clearable />
          </el-form-item>
          <el-form-item label="用户描述信息" prop="info">
            <el-input v-model.trim="userInfo.signature" clearable />
          </el-form-item>
          <el-form-item label="qq号" prop="qq">
            <el-input v-model.trim="userInfo.qq" clearable />
          </el-form-item>
          <el-form-item label="微信号" prop="wx">
            <el-input v-model.trim="userInfo.wx" clearable />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model.trim="userInfo.sex" placeholder="性别">
              <el-option label="男" value="m" />
              <el-option label="女" value="f" />
              <el-option label="保密" value="n" />
            </el-select>
          </el-form-item>
        </el-form>

        <el-form v-else-if="updateType === UpdateType.EMAIL" @keyup.enter="handleSubmit" :model="userInfo">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="userInfo.mail" clearable />
          </el-form-item>
        </el-form>

        <el-form v-else-if="updateType === UpdateType.VIEW_FACE" @keyup.enter="handleSubmit">
          <div v-if="userFace.ufid !== -1">
            <el-image :src="userFace.content" :preview-src-list="[userFace.content]" />
          </div>
          <div v-else>
            <el-image :src="'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=350'" />
          </div>
        </el-form>
      </div>

      <div flex justify-end mt-16px>
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" v-if="updateType !== UpdateType.VIEW_FACE" @click="handleSubmit">确定</el-button>
        <el-button type="primary" v-if="updateType === UpdateType.VIEW_FACE && userFace.ufid !== -1" @click="handleOpenFaceDialog">修改人脸信息</el-button>
        <el-button type="primary" v-if="updateType === UpdateType.VIEW_FACE && userFace.ufid === -1" @click="handleOpenFaceDialog">添加人脸信息</el-button>
        <el-button type="danger" v-if="updateType === UpdateType.VIEW_FACE && userFace.ufid !== -1" @click="handleDelUserFace">删除人脸信息</el-button>
      </div>
    </div>
  </el-dialog>

  <el-dialog
    :close-on-click-modal="false"
    v-model.trim="faceDialogVisible"
    @closed="handleCloseFaceDialog"
    width="50%"
    align-center
    :title="userFace.ufid !== -1 ? '修改人脸信息' : '添加人脸信息'"
    append-to-body
    :show-close="false"
    :close-on-press-escape="false"
  >
    <div v-loading="loadingFace">
      <div flex justify-center items-center w-full>
        <div class="video">
          <video id="faceVideo" />
        </div>
      </div>
      <div flex justify-end mt-16px>
        <span>
          <el-button @click="faceDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleFaceSubmit">确定</el-button>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
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
.el-image {
  width: 100%;
  height: 100%;
}
</style>
