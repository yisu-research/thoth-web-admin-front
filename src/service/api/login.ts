import { request } from '../http'

interface Ilogin {
  account: string
  password: string
}

export function fetchLogin(data: Ilogin) {
  const methodInstance = request.Post<Service.ResponseResult<Api.Login.Info>>('/tokens', data)
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}

export function fetchUserInfo(params: { id: number }) {
  const methodInstance = request.Get(`admin/users/${params.id}`)
  return methodInstance
}

export function fetchUpdateToken(data: any) {
  const method = request.Post<Service.ResponseResult<Api.Login.Info>>('/updateToken', data)
  method.meta = {
    authRole: 'refreshToken',
  }
  return method
}

export function fetchUserRoutes(params: { id: number }) {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]> >('/getUserRoutes', { params })
}
