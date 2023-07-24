<script setup lang="ts">
const props = defineProps<{
  mailCode: string
  address: string
  type: number
}>()
const { mailCode, address, type } = toRefs(props)
const emit = defineEmits(['update:mailCode'])

const code = computed({
  get: () => mailCode.value,
  set: (val: string) => emit('update:mailCode', val)
})

const { sendEmailCode } = useCode()

const { exec, time } = useIntervalRequest(60, async () => {
  if (!address.value) throw new Error('请输入邮箱')
  else await sendEmailCode(address.value, type.value)
})
</script>

<template>
  <div class="flex-between mb-16">
    <div>
      <el-input clearable v-model.trim="code" placeholder="请输入收到的邮箱验证码" size="large" />
    </div>
    <div>
      <el-button disabled size="large" v-if="time">请{{ time }}后操作</el-button>
      <el-button type="danger" size="large" @click="exec" v-else>发送邮箱验证码</el-button>
    </div>
  </div>
</template>
