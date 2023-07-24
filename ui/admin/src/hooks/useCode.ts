import { request } from '@/utils/service'

const imageCode = ref('')
const emailCode = ref('')

export default () => {
  /** 发送图片验证码 */
  const sendImageCode = async () => {
    const { message } = await request<IApiResponseData>({
      url: '/Util/QueryImageCode',
      method: 'get'
    })
    imageCode.value = message
  }

  /** 发送邮箱验证码 */
  const sendEmailCode = async (address: string, type: number) => {
    const { message } = await request<IApiResponseData>({
      url: '/Util/QueryMailCode',
      method: 'post',
      data: {
        address,
        type
      }
    })
    emailCode.value = message
  }

  return { sendImageCode, sendEmailCode, imageCode, emailCode }
}
