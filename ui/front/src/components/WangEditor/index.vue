<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig, IDomEditor, IToolbarConfig } from '@wangeditor/editor'

interface IProps {
  modelValue?: any
}
const props = withDefaults(defineProps<IProps>(), {
  modelValue: ''
})

const emit = defineEmits(['update:modelValue'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef<IDomEditor>()

// 清空编辑器内容
const clearEditor = () => {
  editorRef.value?.clear()
}

defineExpose({
  clearEditor
})

// 内容 HTML
const valueHtml = ref(props.modelValue)

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor
}

watch([valueHtml], (value: any) => {
  console.log(editorRef.value?.getHtml(), value)
  emit('update:modelValue', editorRef.value?.getHtml())
})

// 创建工具栏
const mode = ref('default')

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-video', 'undo', 'redo']
}

const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload/image'
    }
  },
  placeholder: '请输入内容...'
}
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
  </div>
</template>

<style lang="scss" scoped>
.w-e-full-screen-container {
  z-index: 9999;
}
</style>
