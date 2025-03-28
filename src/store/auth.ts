import { router } from '@/router'
import { fetchLogin, fetchUserInfo } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'

interface AuthStatus {
  userInfo: Api.Login.Info | null
  token: string
}
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      userInfo: local.get('userInfo'),
      token: local.get('accessToken') || '',
    }
  },
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /* 登录退出，重置用户信息等 */
    async logout() {
      const route = unref(router.currentRoute)
      // 清除本地缓存
      this.clearAuthStorage()
      // 清空路由、菜单等数据
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()
      // 清空标签栏数据
      const tabStore = useTabStore()
      tabStore.clearAllTabs()
      // 重置当前存储库
      this.$reset()
      // 重定向到登录页
      if (route.meta.requiresAuth) {
        router.push({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        })
      }
    },
    clearAuthStorage() {
      local.remove('accessToken')
      local.remove('refreshToken')
      local.remove('userInfo')
    },

    /* 用户登录 */
    async login(email: string, password: string, verification_code: string) {
      try {
        const { isSuccess, data } = await fetchLogin({ email, password, verification_code })

        if (!isSuccess)
          return

        await this.handleToken({ accessToken: data.token })

        const userInfo = await this.getUserInfo(data.token)

        // 处理登录信息
        await this.handleLoginInfo(userInfo)
      }
      catch (e) {
        console.warn('[Login Error]:', e)
      }
    },

    async getUserInfo(token: string) {
      try {
        const { isSuccess, data } = await fetchUserInfo()
        if (!isSuccess)
          return null

        const userInfo = { ...data, token }
        this.userInfo = userInfo

        return userInfo
      }
      catch (error) {
        console.error('[Get User Info Error]:', error)
        return null
      }
    },

    async handleToken(data: { accessToken: string }) {
      local.set('accessToken', data.accessToken)
      this.token = data.accessToken
    },

    /* 处理登录返回的数据 */
    async handleLoginInfo(data: Api.Login.Info) {
      // 将token和userInfo保存下来
      local.set('userInfo', data)

      // 添加路由和菜单
      const routeStore = useRouteStore()
      await routeStore.initAuthRoute()

      // 进行重定向跳转
      const route = unref(router.currentRoute)
      const query = route.query as { redirect: string }
      router.push({
        path: query.redirect || '/',
      })
    },
  },
})
