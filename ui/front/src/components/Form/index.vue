<script setup lang="ts">
import { computed, toRefs, ref } from 'vue'
import { type FormInstance } from 'element-plus'
import Area from '@/components/Area/index.vue'
import { type FormItems } from './types/index'

interface Props {
  formData: Record<string, any>
  labelWidth?: string | number
  formItems: Array<FormItems>
  colOptions?: {
    xs?: number
    sm?: number
    md?: number
  }
  inline?: boolean
}

const formRef = ref<FormInstance>()

const props = withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
  colOptions: () => ({
    xs: 6,
    sm: 6,
    md: 6
  }),
  inline: false
})

const { formData, labelWidth, formItems, colOptions, inline } = toRefs(props)

const rules = computed(() => {
  const rules: any = {}
  formItems.value.forEach((item) => {
    if (item.rules) {
      rules[item.field] = item.rules
    }
  })
  return rules
})

const emit = defineEmits([
  'handleInputChange',
  'handleAppendIconClick',
  'handlePrependIconClick',
  'handleSelectChange',
  'handleAutocompleteSelect',
  'handleAutocompleteChange',
  'handleDateChange'
])

const handleInputChange = (value: any, field: string) => {
  emit('handleInputChange', value, field)
}

const handleAppendIconClick = (value: any, field: string) => {
  emit('handleAppendIconClick', value, field)
}

const handlePrependIconClick = (value: any, field: string) => {
  emit('handlePrependIconClick', value, field)
}

const handleSelectChange = (value: any, field: string) => {
  emit('handleSelectChange', value, field)
}

const handleAutocompleteSelect = (value: any, field: string) => {
  emit('handleAutocompleteSelect', value, field)
}

const handleAutocompleteChange = (value: any, field: string) => {
  emit('handleAutocompleteChange', value, field)
}

const handleDateChange = (value: any, field: string) => {
  emit('handleDateChange', value, field)
}

defineExpose({
  formRef
})
</script>

<template>
  <el-form :model="formData" :label-width="labelWidth" :rules="rules" :inline="inline" ref="formRef">
    <el-row>
      <el-col :xs="colOptions.xs" :sm="colOptions.sm" :md="colOptions.md" v-for="item in formItems" :key="item.field">
        <el-form-item :prop="item.field" :label-width="item.labelWidth" :label="item.label">
          <!-- input -->
          <template v-if="item.type === 'input'">
            <el-input
              :readonly="item.readonly"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              clearable
              v-model.trim="formData[`${item.field}`]"
              @change="handleInputChange(formData[`${item.field}`], item.field)"
            >
              <!-- 后置图标 -->
              <template v-if="item.appendIcon" #append>
                <i style="cursor: pointer" :class="item.appendIcon" @click="handleAppendIconClick(formData[`${item.field}`], item.field)" />
              </template>
              <!-- 前置图标 -->
              <template v-if="item.prependIcon" #prepend>
                <i style="cursor: pointer" :class="item.prependIcon" @click="handlePrependIconClick(formData[`${item.field}`], item.field)" />
              </template>
            </el-input>
          </template>

          <!-- select -->
          <template v-if="item.type === 'select'">
            <el-select
              :allow-create="item.allowCreate"
              @change="handleSelectChange($event, item.field)"
              clearable
              :readonly="item.readonly"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              filterable
              collapse-tags
              :multiple="item.multiple"
              v-model.trim="formData[`${item.field}`]"
            >
              <el-option v-for="optionItem in item.options" :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" />
            </el-select>
          </template>

          <template v-if="item.type === 'select-v2'">
            <el-select-v2 v-model.trim="formData[`${item.field}`]" :options="item.options" clearable :placeholder="item.placeholder" />
          </template>

          <!-- switch -->
          <template v-if="item.type === 'switch'">
            <el-switch :readonly="item.readonly" :disabled="item.disabled" v-model="formData[`${item.field}`]" />
          </template>

          <!-- radio -->
          <template v-if="item.type === 'radio'">
            <el-radio-group :readonly="item.readonly" :disabled="item.disabled" v-model="formData[`${item.field}`]">
              <el-radio v-for="optionItem in item.options" :label="optionItem.value" :key="optionItem.value">
                {{ optionItem.label }}
              </el-radio>
            </el-radio-group>
          </template>

          <!-- textarea -->
          <template v-if="item.type === 'textarea'">
            <el-input
              v-model.trim="formData[`${item.field}`]"
              type="textarea"
              :rows="item.rows"
              :readonly="item.readonly"
              :disabled="item.disabled"
              :placeholder="item.placeholder"
              clearable
            />
          </template>

          <!-- autocomplete -->
          <template v-if="item.type === 'autocomplete'">
            <el-autocomplete
              v-model.trim="formData[`${item.field}`]"
              @select="handleAutocompleteSelect($event, item.field)"
              @change="handleAutocompleteChange($event, item.field)"
              :fetch-suggestions="item.fetchSuggestions"
              :placeholder="item.placeholder"
              :trigger-on-focus="false"
              :readonly="item.readonly"
              :disabled="item.disabled"
            />
          </template>

          <!-- date -->
          <template v-if="item.type === 'date'">
            <el-date-picker
              type="date"
              :picker-options="item.pickerOptions"
              :placeholder="item.placeholder"
              :clearable="item.clearable"
              :disabled="item.disabled"
              v-model.trim="formData[`${item.field}`]"
              :readonly="item.readonly"
              :format="item.format"
              @change="handleDateChange($event, item.field)"
            />
          </template>

          <!-- daterange -->
          <template v-if="item.type === 'daterange'">
            <el-date-picker
              type="daterange"
              :picker-options="item.pickerOptions"
              :placeholder="item.placeholder"
              :clearable="item.clearable"
              v-model.trim="formData[`${item.field}`]"
              :disabled="item.disabled"
              :readonly="item.readonly"
              :format="item.format"
              @change="handleDateChange($event, item.field)"
            />
          </template>

          <template v-if="item.type === 'area'">
            <Area v-model.trim="formData[`${item.field}`]" />
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 200px;
}

.upload-img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
