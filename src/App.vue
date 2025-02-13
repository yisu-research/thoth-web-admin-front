<script setup lang="ts">
import { naiveI18nOptions } from '@/utils'
import { darkTheme } from 'naive-ui'
import { router } from './router'
import { useAppStore } from './store'
import { useAuthStore } from './store/auth'

const appStore = useAppStore()
const authStore = useAuthStore()
const naiveLocale = computed(() => {
  return naiveI18nOptions[appStore.lang] ? naiveI18nOptions[appStore.lang] : naiveI18nOptions.enUS
},
)

onMounted(async () => {
  const token = authStore.token
  if (!token) {
    // 跳转登录
    router.push('/login')
  }
  else {
    await authStore.getUserInfo()
  }
})
</script>

<template>
  <n-config-provider
    class="wh-full" inline-theme-disabled :theme="appStore.colorMode === 'dark' ? darkTheme : null"
    :locale="naiveLocale.locale" :date-locale="naiveLocale.dateLocale" :theme-overrides="appStore.theme"
  >
    <naive-provider>
      <router-view />
      <Watermark :show-watermark="appStore.showWatermark" />
    </naive-provider>
  </n-config-provider>
</template>
