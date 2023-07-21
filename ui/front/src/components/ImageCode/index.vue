<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

const code = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})

const { sendImageCode, imageCode } = useCode()

sendImageCode()

defineExpose({
  sendImageCode
})
</script>

<template>
  <div class="flex-between mb-16">
    <div>
      <el-input clearable v-model.trim="code" placeholder="请输入图片验证码" size="large" />
    </div>
    <div @click="sendImageCode" class="code">
      <img class="img" :src="imageCode" alt="验证码" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code {
  height: 40px;
  cursor: pointer;
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
