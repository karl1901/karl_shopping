<script setup lang="ts">
import Editor from '@/components/WangEditor/index.vue'
import { getBase64Image } from '@/utils'

const content = ref('')
const content1 = ref('')

const open = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      const video = document.querySelector('video') as HTMLVideoElement
      video.srcObject = stream
      video.play()
    })
    .catch((err) => {
      ElMessage.error('获取摄像头失败，请检查设备是否有摄像头!')
      console.log(err, '获取摄像头失败，请检查设备是否有摄像头!')
    })
}

const close = () => {
  const video = document.querySelector('video') as HTMLVideoElement
  const stream = video.srcObject as MediaStream
  if (!stream) {
    ElMessage.error('请先打开摄像头!')
    return
  }
  const tracks = stream.getTracks()
  tracks.forEach((track) => {
    track.stop()
  })
  video.srcObject = null
}

// 将video视频截图
const jietu = () => {
  const video = document.querySelector('video') as HTMLVideoElement
  content1.value = getBase64Image(video)
  if (content1.value === 'data:,') {
    content1.value = ''
    ElMessage.error('暂无内容，请先打开摄像头!')
    return
  }
  console.log(content1.value)
}

const clear = () => {
  if (content1.value === '') {
    ElMessage.error('暂无内容可以清空!')
    return
  }
  content1.value = ''
}

// 将图片转换为base64
</script>

<template>
  <div class="app-container center">
    <!-- <Editor :config="{ height: 300 }" v-model="content" />
    <highlightjs autodetect :code="content" /> -->
    <el-button @click="open">打开摄像头</el-button>
    <el-button @click="close">关闭摄像头</el-button>
    <el-button @click="jietu">截图</el-button>
    <el-button @click="clear">清空截图</el-button>
    <img :src="content1" alt="" />
    <div class="video">
      <video />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
