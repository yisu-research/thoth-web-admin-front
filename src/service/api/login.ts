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

export function fetchUserInfo() {
  const methodInstance = request.Get(`/admin/users/current`)
  return methodInstance
}

// export function fetchUpdateUserInfo(data: any) {
//   const methodInstance = request.Put<Service.ResponseResult<any>>(`/admin/users/current`, data)
//   return methodInstance
// }

export function fetchUpdateToken(data: any) {
  const method = request.Post<Service.ResponseResult<Api.Login.Info>>('/admin/updateToken', data)
  method.meta = {
    authRole: 'refreshToken',
  }
  return method
}

export function fetchUserRoutes(params: { id: number }) {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]> >('/getUserRoutes', { params })
}
