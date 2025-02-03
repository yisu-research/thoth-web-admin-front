<script setup lang="ts">
import { ThothSmartAvatar } from '@/components/common'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()

const { userInfo } = authStore
// const formRef = ref()
// const formValue = ref({
//   password: '',
// })

// function handleValidateClick() {
//   formRef.value?.validate((errors: any) => {
//     if (!errors)
//       window.$message.success('Validation passed')
//     else window.$message.error('Validation failed')
//   })
// }
</script>

<template>
  <n-space vertical>
    <n-card>
      <div class="flex gap-4">
        <ThothSmartAvatar
          :name="userInfo?.username"
          :size="128"
          :src="userInfo?.avatarUrl"
          shape="circle"
          class="flex-shrink-0"
        />

        <div class="w-full">
          <n-descriptions label-placement="left" :column="2" title="Personal Information">
            <n-descriptions-item label="Username">
              <p>
                {{ userInfo?.username }}
              </p>
            </n-descriptions-item>
            <n-descriptions-item label="Role">
              <p>
                {{ userInfo?.role }}
              </p>
            </n-descriptions-item>
          </n-descriptions>
        </div>
      </div>
    </n-card>
    <!-- <n-card title="修改密码">
      <n-space justify="center">
        <n-form ref="formRef" class="w-500px" :label-width="80" :model="formValue">
          <n-form-item label="新密码" path="password">
            <n-input v-model:value="formValue.password" placeholder="新密码" />
          </n-form-item>
          <n-form-item>
            <n-button type="primary" attr-type="button" block @click="handleValidateClick">
              修改
            </n-button>
          </n-form-item>
        </n-form>
      </n-space>
    </n-card> -->
  </n-space>
</template>

<style scoped></style>
