import { request } from '@/utils/service'

export interface UpdatePwdRequestData {
  user: { pwd: string }
}

export interface UpdateUserInfoRequestData {
  user: { nickname?: string; wx?: string; qq?: string; signature?: string; sex?: string; avatar_url?: string }
}

export function updatePwdApi(data: UpdatePwdRequestData) {
  return request<IApiResponseData>({
    url: '/User/UpdatePwd',
    method: 'post',
    data
  })
}

export function updateUserInfoApi(data: UpdateUserInfoRequestData) {
  return request<IApiResponseData>({
    url: '/User/UpdateInfo',
    method: 'post',
    data
  })
}

export function updateUserEmailApi(data: { user: { mail: string } }) {
  return request<IApiResponseData>({
    url: '/User/UpdateMail',
    method: 'post',
    data
  })
}

export function queryUserFaceApi() {
  return request<IApiResponseData>({
    url: '/UserFace/Query',
    method: 'post'
  })
}

export function addUserFaceApi(data: { userFace: { content: string } }) {
  return request<IApiResponseData>({
    url: '/UserFace/Add',
    method: 'post',
    data
  })
}

export function updateUserFaceApi(data: { userFace: { content: string; ufid: number } }) {
  return request<IApiResponseData>({
    url: '/UserFace/Update',
    method: 'post',
    data
  })
}

export function delUserFaceApi(data: { userFace: { ufid: number } }) {
  return request<IApiResponseData>({
    url: '/UserFace/Del',
    method: 'post',
    data
  })
}

export function logOffUserApi() {
  return request<IApiResponseData>({
    url: '/User/Logout',
    method: 'post'
  })
}
