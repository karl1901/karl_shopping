import { request } from '@/utils/service'

export interface WebInfosResponseData {
  create_time: string
  name: string
  value: string
  last_time: string
  wiid: number
  wtid: number
}

export interface WebInfosRequestData {
  page: {
    pageNumber: number
    pageSize: number
  }
  web_info: {
    name: string
    wtid: number
  }
}

export interface WebInfosgUpdateRequestData {
  web_info: {
    name: string
    wiid: number
    wtid: number
    value: string
  }
}

export interface WebInfosgAddRequestData {
  web_info: {
    name: string
    wtid: number
    value: string
  }
}

/** 查询所有网站信息 */
export function queryAllWebInfosApi(data: WebInfosRequestData) {
  return request<IApiResponsePageData<WebInfosResponseData>>({
    url: '/WebInfos/QueryAll',
    method: 'post',
    data
  })
}

export interface WebTypeResponseData {
  create_time: string
  name: string
  last_time: string
  wtid: number
}

export interface WebTypeRequestData {
  page: {
    pageNumber: number
    pageSize: number
  }
  web_type?: {
    name: string
    wtid: number
  }
}

export interface WebTypegUpdateRequestData {
  web_type: {
    name: string
    wtid: number
  }
}

export interface WebTypegAddRequestData {
  web_type: {
    name: string
  }
}

/** 修改网站信息 */
export function updateWebInfosApi(data: WebInfosgUpdateRequestData) {
  return request<IApiResponseData>({
    url: '/WebInfos/Update',
    method: 'post',
    data
  })
}

/** 删除网站信息 */
export function deleteWebInfosApi(data: { web_info: { wiid: number } }) {
  return request<IApiResponseData>({
    url: '/WebInfos/Del',
    method: 'post',
    data
  })
}

/** 添加网站信息 */
export function addWebInfosApi(data: WebInfosgAddRequestData) {
  return request<IApiResponseData>({
    url: '/WebInfos/Add',
    method: 'post',
    data
  })
}

/** 查询所有网站分类 */
export function queryAllWebTypeApi(data: WebTypeRequestData) {
  return request<IApiResponsePageData<WebTypeResponseData>>({
    url: '/WebInfos/QueryTypeAll',
    method: 'post',
    data
  })
}

/** 修改网站分类 */
export function updateWebTypeApi(data: WebTypegUpdateRequestData) {
  return request<IApiResponseData>({
    url: '/WebInfos/UpdateType',
    method: 'post',
    data
  })
}

/** 删除网站分类 */
export function deleteWebTypeApi(data: { web_type: { wtid: number } }) {
  return request<IApiResponseData>({
    url: '/WebInfos/DelType',
    method: 'post',
    data
  })
}

/** 添加网站分类 */
export function addWebTypeApi(data: WebTypegAddRequestData) {
  return request<IApiResponseData>({
    url: '/WebInfos/AddType',
    method: 'post',
    data
  })
}

/** 查询分类信息下网站信息总数量 */
export function queryTypeCountApi(data: { web_info: { wtid: number } }) {
  return request<IApiResponseData>({
    url: '/WebInfos/QueryTypeCount',
    method: 'post',
    data
  })
}
