import { request } from '../http'

// 剩余额度
export function fetchCostBalance() {
  return request.Get<Service.ResponseResult<any>>('/admin/usage/app')
}

// 充值记录
export function fetchCostRecharge(params: { page: number, limit: number }) {
  return request.Get<Service.ResponseResult<any>>('/usage/order', { params })
}

// 消耗明细
export function fetchCostDetail(params: { page: number, limit: number }) {
  return request.Get<Service.ResponseResult<any>>('/usage/detail', { params })
}

// 额度消耗
export function fetchCostConsume(params: { start_time: string, end_time: string }) {
  return request.Get<Service.ResponseResult<any>>('/usage/quota', { params })
}

// 用户视角
export function fetchCostUser() {
  return request.Get<Service.ResponseResult<any>>('/usage/user')
}

// 模型视角
export function fetchCostModel() {
  return request.Get<Service.ResponseResult<any>>('/usage/engine')
}
