<script setup lang="ts">
import { updateSystemConfigApi } from '@/api/system-config'
interface Props {
  visible: boolean
  updateId: any
  modelValue: Record<string, any>
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:visible', 'update:updateId', 'update:table'])
const formData = useVmodel(props, 'modelValue', emit)
const baseForm = ref<any>()
const loading = ref(false)

const resetForm = () => {
  currentUpdateId.value = undefined
  dialogVisible.value = false
  baseForm.value?.formRef.resetFields()
  formData.value = {}
}
const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  }
})
const currentUpdateId = computed({
  get() {
    return props.updateId
  },
  set(val) {
    emit('update:updateId', val)
  }
})

/** 提交新建/修改表单 */
const submitForm = () => {
  baseForm.value?.formRef.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      const data = {
        system_config: {
          info: formData.value.info,
          scid: formData.value.scid,
          value: formData.value.value
        }
      }
      if (currentUpdateId.value === undefined) {
        // addSystemConfigApi({})
      } else {
        updateSystemConfigApi(data)
          .then(() => {
            emit('update:table')
            resetForm()
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            loading.value = false
          })
      }
    } else {
      return false
    }
  })
}
const formItems = [
  {
    field: 'info',
    label: '系统配置描述',
    type: 'input' as const,
    placeholder: '请输入系统配置描述',
    rules: [{ required: true, message: '请输入系统配置描述', trigger: 'blur' }]
  },
  {
    field: 'value',
    label: '系统配置值',
    type: 'input' as const,
    placeholder: '请输入系统配置值',
    rules: [{ required: true, message: '请输入系统配置值', trigger: 'blur' }]
  }
]
</script>
<template>
  <el-dialog v-model="dialogVisible" :title="currentUpdateId === undefined ? '新增系统配置' : '修改系统配置'" width="80%" @close="resetForm">
    <Form ref="baseForm" v-loading="loading" :formItems="formItems" :formData="formData" />

    <template #footer>
      <span>
        <el-button @click="resetForm" plain>取 消</el-button>
        <el-button :loading="loading" type="primary" @click="submitForm" plain>保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
