/** 所有 api 接口的响应数据都应该准守该格式 */

interface IApiResponseData<T = any> {
  code: number
  message: string
  resultData?: T
  success: boolean
  token?: string
}

interface IApiResponsePageData<T = any> {
  code: number
  message: string
  resultData: {
    list: T[]
    page: {
      pageSize: number
      pageNumber: number
      pageTotal: number
    }
    [key: string]: any[]
  }
  success: boolean
  token: string
}
