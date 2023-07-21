/** 表单类型 */
export interface FormItems {
  field: string
  label: string
  type: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'upload' | 'area' | 'switch' | 'autocomplete' | 'daterange' | 'select-v2'
  placeholder?: string
  labelWidth?: string
  readonly?: boolean
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  allowCreate?: boolean
  options?: Array<{ label: string; value: string | number }>
  rows?: number
  pickerOptions?: Record<string, any>
  appendIcon?: string
  prependIcon?: string
  fetchSuggestions?: (queryString: string, cb: Function) => void
  size?: string
  format?: string
  fileList?: Array<Record<string, any>>
  rules?: Array<Record<string, any>>
  onClick?: () => void
}
