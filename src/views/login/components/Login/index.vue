<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { fetchSendVerificationCode } from '@/service/api/login'
import { useAuthStore } from '@/store'
import { local } from '@/utils'

const authStore = useAuthStore()

const { t } = useI18n()
const rules = computed(() => {
  return {
    email: {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        // 邮箱格式验证
        if (!/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(value)) {
          callback(new Error(t('login.emailRuleTip')))
        }
        else {
          callback()
        }
      },
    },
    password: {
      required: true,
      trigger: 'blur',
      message: t('login.passwordRuleTip'),
    },
    verification_code: {
      required: true,
      trigger: 'blur',
      message: t('login.verificationCodeRuleTip'),
    },
  }
})
const formValue = ref({
  email: '',
  password: '',
  verification_code: '',
})
const isRemember = ref(false)
const isLoading = ref(false)
const isSendingCode = ref(false)
const countdown = ref(0)
const countdownTimer = ref<NodeJS.Timeout | null>(null)

const formRef = ref<FormInst | null>(null)
function handleLogin() {
  formRef.value?.validate(async (errors) => {
    if (errors)
      return

    isLoading.value = true
    const { email, password, verification_code } = formValue.value

    if (isRemember.value)
      local.set('loginAccount', { email, password, verification_code })
    else local.remove('loginAccount')

    await authStore.login(email, password, verification_code)
    isLoading.value = false
  })
}

function sendVerificationCode() {
  // 邮箱格式验证
  if (!/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(formValue.value.email)) {
    window.$message?.error(t('login.emailRuleTip'))
    return
  }

  isSendingCode.value = true

  fetchSendVerificationCode({ email: formValue.value.email, purpose: 'login' })
    .then(({ isSuccess }) => {
      if (isSuccess) {
        startCountdown()
        window.$message?.success(t('login.verificationCodeSent'))
      }
    })
    .finally(() => {
      isSendingCode.value = false
    })
}

function startCountdown() {
  countdown.value = 60 // 60 seconds countdown

  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }

  countdownTimer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
    else {
      if (countdownTimer.value) {
        clearInterval(countdownTimer.value)
        countdownTimer.value = null
      }
    }
  }, 1000)
}

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})

onMounted(() => {
  checkUserAccount()
})

function checkUserAccount() {
  const loginAccount = local.get('loginAccount')
  if (!loginAccount)
    return

  formValue.value = loginAccount
  isRemember.value = true
}
</script>

<template>
  <div>
    <n-h2 depth="3" class="text-center">
      {{ $t('login.signInTitle') }}
    </n-h2>
    <n-form ref="formRef" :rules="rules" :model="formValue" :show-label="false" size="large">
      <n-form-item path="email">
        <n-input v-model:value="formValue.email" clearable :placeholder="$t('login.emailPlaceholder')" />
      </n-form-item>
      <n-form-item path="password">
        <n-input v-model:value="formValue.password" type="password" :placeholder="$t('login.passwordPlaceholder')" clearable show-password-on="click">
          <template #password-invisible-icon>
            <icon-park-outline-preview-close-one />
          </template>
          <template #password-visible-icon>
            <icon-park-outline-preview-open />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="verification_code">
        <n-input-group>
          <n-input v-model:value="formValue.verification_code" clearable :placeholder="$t('login.verificationCodePlaceholder')" />
          <n-button
            type="primary"
            :disabled="countdown > 0 || isSendingCode"
            :loading="isSendingCode"
            style="min-width: 140px;"
            @click="sendVerificationCode"
          >
            <span v-if="countdown > 0">{{ countdown }}s</span>
            <span v-else>{{ $t('login.sendVerificationCode') }}</span>
          </n-button>
        </n-input-group>
      </n-form-item>
      <n-space vertical :size="20">
        <div class="flex-y-center justify-between">
          <n-checkbox v-model:checked="isRemember">
            {{ $t('login.rememberMe') }}
          </n-checkbox>
        </div>
        <n-button block type="primary" size="large" :loading="isLoading" :disabled="isLoading" @click="handleLogin">
          {{ $t('login.signIn') }}
        </n-button>
      </n-space>
    </n-form>
  </div>
</template>

<style scoped></style>
