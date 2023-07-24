import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  /** 排除 */
  exclude: ['node_modules'],
  /** 预设 */
  presets: [
    /** 属性化模式 & 无值的属性模式 */
    presetAttributify(),
    /** 默认预设 */
    presetUno()
  ],
  /** 自定义规则 */
  rules: [['h-[calc(100vh-330px)]', { height: 'calc(100vh-330px)' }]]
})
