import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { useUserStoreHook } from '@/store/modules/user'
import { message } from 'ant-design-vue'
import { get } from 'lodash-es'
const storage = useStorage()

// 需要检查角色的接口
const needCheckRoleUrl = ['/User/MailLogin', '/User/Login', '/UserFace/LoginUser']
// 不需要显示消息的接口
const noShowMessageUrl = ['/Util/QueryImageCode']

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      // if ((config.method as string).toLowerCase() == 'post') {
      config.data = qs.stringify(config.data, { allowDots: true })
      // }
      return config
    },
    // 发送失败
    (error) => Promise.reject(error)
  )
  // 响应拦截（可根据具体业务作出相应的调整）
  service.interceptors.response.use(
    (response) => {
      const apiData = response.data as any
      const code = apiData.code
      const url = response.config.url as string
      if (apiData.token) storage.set('token', apiData.token)
      switch (code) {
        case 200:
          if (
            (needCheckRoleUrl.includes(url) && apiData.resultData.role !== 'admin') ||
            (url === '/User/QueryLogin' && apiData.resultData.user.role !== 'admin')
          ) {
            message.error('您不是管理员，无法登录！')
            useUserStoreHook().resetState()
            useUserStoreHook().logout()
            return Promise.reject('您不是管理员，无法登录！')
          }
          if (!noShowMessageUrl.includes(url) && apiData.message) message.success(apiData.message)
          return apiData
        case 1000:
          if (storage.get('currentPath') !== '/login' && storage.get('currentPath') !== '/' && storage.get('currentPath') !== '/dashboard')
            message.error(apiData.message || 'Error')
          useUserStoreHook().resetState()
          return Promise.reject(apiData.message || 'Error')
        case 2001:
          useUserStoreHook().resetToken()
          message.error(apiData.message || 'Error')
          return Promise.reject(apiData.message || 'Error')
        default:
          message.error(apiData.message || 'Error')
          return Promise.reject(apiData.message || 'Error')
      }
    },
    (error) => {
      const status = get(error, 'response.status')
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          error.message = '请求错误'
          break
        case HttpStatus.UNAUTHORIZED:
          useUserStoreHook().resetState()
          location.reload()
          break
        case HttpStatus.FORBIDDEN:
          error.message = '拒绝访问'
          break
        case HttpStatus.NOT_FOUND:
          error.message = '请求地址出错'
          break
        case HttpStatus.REQUEST_TIMEOUT:
          error.message = '请求超时'
          break
        case HttpStatus.INTERNAL_SERVER_ERROR:
          error.message = '服务器内部错误'
          break
        case HttpStatus.NOT_IMPLEMENTED:
          error.message = '服务未实现'
          break
        case HttpStatus.BAD_GATEWAY:
          error.message = '网关错误'
          break
        case HttpStatus.SERVICE_UNAVAILABLE:
          error.message = '服务不可用'
          break
        case HttpStatus.GATEWAY_TIMEOUT:
          error.message = '网关超时'
          break
        case HttpStatus.HTTP_VERSION_NOT_SUPPORTED:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          break
      }
      if (error.message.includes('timeout')) error.message = '请求超时，请刷新重试'
      message.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

/** 创建请求方法 */
function createRequestFunction(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig, timeout = 10000): Promise<T> {
    const configDefault = {
      headers: {
        token: storage.get('token'),
        'Content-Type': get(config, 'headers.Content-Type', 'application/x-www-form-urlencoded')
      },
      timeout,
      baseURL: import.meta.env.VITE_BASE_API,
      data: {}
    }
    return service(Object.assign(configDefault, config))
  }
}

/** 用于网络请求的实例 */
export const service = createService()
/** 用于网络请求的方法 */
export const request = createRequestFunction(service)
