import { request } from '@/utils/service'
interface RequestData {
  page: {
    pageNumber: number
    pageSize: number
  }
  [key: string]: any
}

/**
 * @description 获取数据
 * @param {string} dataModel 数据模型
 * @param {RequestData} data
 * @param {string} dataModelType
 * @returns {Promise}
 * @example
 *
 */
export function getDataModelDataApi(dataModel: string, data: RequestData, dataModelType = 'QueryAll') {
  return request<IApiResponsePageData>({
    url: `/${dataModel}/${dataModelType}`,
    method: 'post',
    data
  })
}
