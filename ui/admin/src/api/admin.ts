import { request } from '@/utils/service'

export interface BannedUserRequestData {
  cause: string
  uid: number
  enable: 'y' | 'n'
}
export interface SendMessageRequestData {
  info: string
  acceptid: number
  title: string
}

export function bannedUserApi(data: { user: BannedUserRequestData }) {
  return request<IApiResponseData>({
    url: 'UserAdminister/BannedUser',
    method: 'post',
    data
  })
}

export function sendMessageApi(data: { userMessage: SendMessageRequestData }) {
  return request<IApiResponseData>({
    url: 'UserAdminister/SendMessage',
    method: 'post',
    data
  })
}
