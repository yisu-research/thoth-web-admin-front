import { request } from '../http'

// 获取系统配置
export function fetchSystemConfig() {
  return request.Get<Service.ResponseResult<any>>('/admin/settings/current')
}

// 更新系统配置
export function fetchUpdateSystemConfig(data: any) {
  return request.Put<Service.ResponseResult<any>>(`/admin/settings`, data)
}
