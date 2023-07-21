import { request } from '@/utils/service'

export interface SystemConfigResponseData {
  create_time: string
  info: string
  key: string
  lastupdate_time: string
  scid: number
  value: number
}
export interface SystemConfigRequestData {
  page: {
    pageNumber: number
    pageSize: number
  }
  system_config: {
    info: string
  }
}

export interface SystemConfigUpdateRequestData {
  system_config: {
    info: string
    scid: number
    value: number
  }
}

/** 查询所有系统配置 */
export function queryAllSystemConfigApi(data: SystemConfigRequestData) {
  return request<IApiResponsePageData>({
    url: '/SystemConfig/QueryAll',
    method: 'post',
    data
  })
}

/** 重置系统配置 */
export function resetSystemConfigApi() {
  return request<IApiResponseData>({
    url: '/SystemConfig/Reset',
    method: 'post'
  })
}

/** 修改系统配置 */
export function updateSystemConfigApi(data: SystemConfigUpdateRequestData) {
  return request<IApiResponseData>({
    url: '/SystemConfig/Update',
    method: 'post',
    data
  })
}
