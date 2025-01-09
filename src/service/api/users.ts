import { request } from '../http'

// 创建用户
export function fetchCreateUser(data: any) {
  const methodInstance = request.Post<Service.ResponseResult<any>>('/admin/users', data)
  return methodInstance
}

// 获取用户列表
export function fetchUsers(params: { page: number, limit: number }) {
  const methodInstance = request.Get<Service.ResponseResult<any>>('/admin/users', { params })
  return methodInstance
}

// 获取用户信息
export function fetchUserDetail(data: { id: number }) {
  const methodInstance = request.Get<Service.ResponseResult<any>>(`/admin/users/${data.id}`)
  return methodInstance
}

// 编辑用户
export function fetchUpdateUserInfo(data: any) {
  const methodInstance = request.Put<Service.ResponseResult<any>>('/admin/users', data)
  return methodInstance
}

// 审核用户
export function fetchAuditUser(data: { id: number, params: any }) {
  const methodInstance = request.Put<Service.ResponseResult<any>>(`/admin/users/${data.id}/review`, data.params)
  return methodInstance
}

// 删除用户
export function fetchDeleteUser(data: { id: number }) {
  const methodInstance = request.Delete<Service.ResponseResult<any>>(`/admin/users/${data.id}`)
  return methodInstance
}
