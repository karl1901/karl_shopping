/** 表格字段 */
export interface TableColumn {
  label: string
  prop: string
  type?: string
  model?: string
  disabled?: boolean
  width?: string | number
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  formatter?: (row: any, column: any, cellValue: any, index: any) => any
  slotName?: string
  showOverflowTooltip?: boolean
  tagType?: 'success' | 'info' | 'warning' | 'danger' | undefined
}

/** 操作栏button按钮 */
export interface ButtonList {
  label?: string
  type?: 'default' | 'text' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | undefined
  size?: 'medium' | 'small' | 'mini' | undefined
  icon?: string
  disabled?: boolean
  plain?: boolean
  round?: boolean
  circle?: boolean
  loading?: boolean
  disabledText?: string
  click: (row: any) => void
}
