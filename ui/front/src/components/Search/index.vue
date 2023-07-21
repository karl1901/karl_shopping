<script setup lang="ts">
type Type = 'input' | 'select' | 'date' | 'daterange' | 'button'
type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

interface SearchItem {
  label?: string
  field: string
  type: Type
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
  width?: string | number
  rules?: Array<any>
  click?: () => void
  buttonType?: ButtonType
  text?: string
  show?: boolean
}
const props = defineProps<{
  searchItems: Array<SearchItem>
  searchData: Record<string, any>
}>()

const { searchItems, searchData } = toRefs(props)

const computedSearchItems = computed(() => {
  return searchItems.value.filter((item) => item.show || item.show === undefined)
})
</script>

<template>
  <el-card>
    <el-form ref="form" inline :model="searchData">
      <el-form-item :label="item.label" v-for="item in computedSearchItems" :key="item.field">
        <template v-if="item.type === 'input'">
          <el-input v-model.trim="searchData[item.field]" clearable :placeholder="item.placeholder" />
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select v-model="searchData[item.field]" :placeholder="item.placeholder" clearable filterable>
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </template>
        <template v-else-if="item.type === 'date'">
          <el-date-picker v-model="searchData[item.field]" type="date" :placeholder="item.placeholder" />
        </template>
        <template v-else-if="item.type === 'daterange'">
          <el-date-picker v-model="searchData[item.field]" type="daterange" :placeholder="item.placeholder" />
        </template>
        <template v-else-if="item.type === 'button'">
          <el-button :type="item.buttonType" @click="item.click" plain>{{ item.text }}</el-button>
        </template>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
