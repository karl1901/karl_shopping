import md5 from 'spark-md5'
import { CodeToText } from 'element-china-area-data'

function _formatNormalize(formatter: any) {
  if (typeof formatter === 'function') {
    return formatter
  }

  if (typeof formatter !== 'string') {
    throw new Error('formatter must be a string')
  }

  if (formatter === undefined || formatter === null) {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }

  if (formatter === 'date') {
    formatter = 'yyyy-MM-dd'
  } else if (formatter === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm:ss'
  }

  const formatterFunc = (dateInfo: any) => {
    // const { yyyy, MM, dd, HH, mm, ss, ms } = dateInfo
    return formatter.replace(/yyyy|MM|dd|HH|mm|ss|ms/g, (match: any) => {
      return dateInfo[match]
    })
  }
  return formatterFunc
}

/** 格式化时间 */
export const formatDateTime = (time: any, formtter: any = 'datetime', isPad = true) => {
  formtter = _formatNormalize(formtter)
  if (typeof time === 'string' || typeof time === 'number') {
    time = new Date(time)
  }
  const dateInfo = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
    miniSecond: time.getMilliseconds()
  } as any
  dateInfo.yyyy = dateInfo.year.toString()
  dateInfo.MM = dateInfo.month.toString()
  dateInfo.dd = dateInfo.date.toString()
  dateInfo.HH = dateInfo.hour.toString()
  dateInfo.mm = dateInfo.minute.toString()
  dateInfo.ss = dateInfo.second.toString()
  dateInfo.ms = dateInfo.miniSecond.toString()
  function _pad(prop: string, len = 2) {
    dateInfo[prop] = dateInfo[prop].padStart(len, '0')
  }
  if (isPad) {
    _pad('yyyy', 4)
    _pad('MM')
    _pad('dd')
    _pad('HH')
    _pad('mm')
    _pad('ss')
    _pad('ms', 3)
  }
  return formtter(dateInfo)
}

/** 将全局 CSS 变量导入 JS 中使用 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ''
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 获取 MD5 16位值 8-24*/
export const getMD5 = (str: string, len = 16) => {
  if (len === 16) return md5.hash(str).slice(8, 24)
  return md5.hash(str).slice(0, len)
}

/**
 * 随机uuid
 * @returns {string} uuid
 * @example randomUUID() => '5e6f7e8f-9a0b-4c1d-a2b3-c4d5e6f7e8f9'
 */
export function randomUUID() {
  let d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/**
 * 地区编码转地区
 * @param {string} codeStr 地区编码字符串
 * @param {array} codeArray 地区编码数组
 * @returns {string} 地区
 *
 */
export function changeArea(codeStr: any, codeArray: string[]) {
  if (codeStr === null && codeArray === null) {
    return null
  } else if (codeArray === null) {
    codeArray = codeStr.split(',')
  }
  let area = ''
  switch (codeArray && codeArray.length) {
    case 1:
      area += CodeToText[codeArray[0]]
      break
    case 2:
      area += CodeToText[codeArray[0]] + '/' + CodeToText[codeArray[1]]
      break
    case 3:
      area += CodeToText[codeArray[0]] + '/' + CodeToText[codeArray[1]] + '/' + CodeToText[codeArray[2]]
      break
    default:
      break
  }
  return area
}

/** 格式化money */
export function formatMoney(money: number) {
  return (+money || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/** 判断是不是对象 */
export function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/** 判断是不是数组 */
export function isArray(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

/** 判断是不是字符串 */
export function isString(obj: any) {
  return Object.prototype.toString.call(obj) === '[object String]'
}

/** 判断是不是数字 */
export function isNumber(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Number]'
}

/** 判断是不是布尔值 */
export function isBoolean(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Boolean]'
}

/** 判断是不是函数 */
export function isFunction(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Function]'
}

/** 判断是不是空 */
export function isEmpty(obj: any) {
  if (obj === null || obj === undefined) {
    return true
  }
  if (isArray(obj) || isString(obj)) {
    return obj.length === 0
  }
  if (isObject(obj)) {
    return Object.keys(obj).length === 0
  }
  return false
}

/** 将图片转换为base64 canvas */
export function getBase64Image(video: any) {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
  const ext = video.src.substring(video.src.lastIndexOf('.') + 1).toLowerCase()
  const dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}

/**
 * 获取一串文字的宽度
 */

export function getTextWidth(text: string, fontSize = 12) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.font = `${fontSize}px Arial`
  return ctx?.measureText(text).width
}
