export interface SearchItem {
  field?: string // 字段名
  type: 'input' | 'select' | 'date' | 'dateRange' | 'button' // 类型
  click?: () => void // 点击事件
  buttonType?: 'primary' | 'default' | 'danger' | 'link' | 'text' | 'info' | 'success' | 'warning' // 按钮类型
  placeholder?: string // 占位符
  text?: string // 文本
}
