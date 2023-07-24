<script setup lang="ts">
import { regionData } from 'element-china-area-data'
import { computed } from 'vue'
interface Props {
  modelValue?: Array<string> | string
}
// 判断是不是一个json
const isJson = (str: string) => {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])
const myValue = computed({
  get() {
    return isJson(props.modelValue as string) ? JSON.parse(props.modelValue as string) : props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const handleChange = (val: any) => {
  console.log(val)
}

const options = regionData
</script>

<template>
  <el-cascader v-model="myValue" placeholder="请选择地区" :options="options" clearable @change="handleChange" />
</template>
<style lang="scss" scoped></style>
e
