import { request } from '@/utils/service'
/**
 * @description: 登录请求参数
 */
export interface LoginRequestData {
  user: {
    uname: string
    pwd: string
  }
  imageCode: string
  address: string
  mailCode: string
  uid: number
}

export type LoginRequestByUnameData = Pick<LoginRequestData, 'user' | 'imageCode'>

export type LoginRequestByMailData = Pick<LoginRequestData, 'address' | 'mailCode'>

export interface RegisterRequestData {
  user: {
    uname: string
    pwd: string
  }
  imageCode: string
  mailCode: string
  address: string
}

export interface LoginResponseData {
  user: {
    uid: number
    uname: string
    pwd: string
    salt: string
    nickname: string
    mail: string
    role: string
    enable: 'y' | 'n'
    reg_time: number
    lastdoing_time: number
    qq?: string
    wx?: string
    avatar_url?: string
    signature?: string
    sex?: string
    cause?: string
  }
}

export type UserData = Pick<LoginResponseData['user'], keyof LoginResponseData['user']>

/** 登录 */
export function loginApi(data: LoginRequestByUnameData) {
  return request<IApiResponseData>({
    url: '/User/Login',
    method: 'post',
    data
  })
}
/** 邮箱登录 */
export function loginByEmailApi(data: LoginRequestByMailData) {
  return request<IApiResponseData>({
    url: '/User/MailLogin',
    method: 'post',
    data
  })
}

export function loginByUserFaceApi(data: { userFace: { uid: number } }) {
  return request<IApiResponseData>({
    url: '/UserFace/LoginUser',
    method: 'post',
    data
  })
}

/** 获取用户信息 */
export function getUserInfoApi() {
  return request<IApiResponseData<LoginResponseData>>({
    url: '/User/QueryLogin',
    method: 'post'
  })
}

/** 登出 */
export function logoutApi() {
  return request<IApiResponseData>({
    url: '/User/Loginout',
    method: 'post'
  })
}

/** 注册 */
export function registerApi(data: RegisterRequestData) {
  return request<IApiResponseData>({
    url: '/User/Reg',
    method: 'post',
    data
  })
}

export function checkFaceApi(data: { userFace: { content: string } }) {
  return request<IApiResponseData>(
    {
      url: '/UserFace/CheckFace',
      method: 'post',
      data
    },
    30000
  )
}
