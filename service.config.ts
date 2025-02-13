/** 不同请求服务的环境配置 */
export const serviceConfig: Record<ServiceEnvType, Record<string, string>> = {
  dev: {
    url: 'https://thoth-admin.yisukeyan.com/api/',
  },
  test: {
    url: 'http://8.142.167.132:3002/api/',
  },
  prod: {
    url: '/api/',
  },
}
