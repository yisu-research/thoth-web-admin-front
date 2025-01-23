import { request } from '../http'

// 获取模型列表
export function fetchModelList(params: { page: number, limit: number }) {
  const methodInstance = request.Get<Service.ResponseResult<any>>('/admin/engines', { params })
  return methodInstance
}

// 更新模型
export function fetchUpdateModel(data: any) {
  const methodInstance = request.Put<Service.ResponseResult<any>>(`/admin/engines/${data.id}`, data)
  return methodInstance
}
