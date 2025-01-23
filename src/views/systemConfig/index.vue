<script setup lang="ts">
import { fetchSystemConfig, fetchUpdateSystemConfig } from '@/service/api/config'

const config = ref<any>({
  system_name: '',
  logo: '',
  admin_email: '',
  website_url: '',
})
const configForm = ref<any>(null)
const showModal = ref(false)

// const token = localStorage.getItem('accessToken')

async function getConfig() {
  try {
    const { isSuccess, ...data } = await fetchSystemConfig()
    if (!isSuccess)
      return

    config.value = data
  }
  catch (error) {
    console.error(error)
  }
}

function handleClose() {
  configForm.value = null
  showModal.value = false
}

function openModal() {
  showModal.value = true
  configForm.value = config.value
}

// const fileList = ref<any[]>([])

// function beforeUpload(file: any) {
//   console.log(file)
// }

async function handleSubmit() {
  try {
    const { isSuccess } = await fetchUpdateSystemConfig(configForm.value)
    if (!isSuccess)
      return

    getConfig()
    handleClose()
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getConfig()
})
</script>

<template>
  <div>
    <div class="flex justify-start mb-4">
      <NButton type="primary" @click="openModal">
        更新系统配置
      </NButton>

      <NModal v-model:show="showModal" title="更新系统配置" @close="handleClose">
        <NCard title="更新系统配置" style="width: 600px;">
          <NForm
            :model="configForm"
          >
            <NFormItem label="系统名称">
              <NInput v-model:value="configForm.system_name" />
            </NFormItem>
            <NFormItem label="系统Logo">
              <!-- {{ fileList }} -->
              <!-- <NUpload
              v-model:value="configForm.logo"
              v-model:file-list="fileList"
              abstract
              action="/api/attachments"
              :headers="{
                Authorization: `Bearer ${token}`,
              }"
              list-type="image-card"
              @before-upload="beforeUpload"
            /> -->
              <NInput v-model:value="configForm.logo" />
            </NFormItem>
            <NFormItem label="管理员邮箱">
              <NInput v-model:value="configForm.admin_email" />
            </NFormItem>
            <NFormItem label="网站地址">
              <NInput v-model:value="configForm.website_url" />
            </NFormItem>
          </NForm>

          <div>
            <NButton type="primary" @click="handleSubmit">
              更新
            </NButton>
          </div>
        </NCard>
      </NModal>
    </div>
    <n-descriptions label-placement="top" bordered :column="6">
      <n-descriptions-item :span="3">
        <template #label>
          系统名称
        </template>
        {{ config.system_name }}
      </n-descriptions-item>
      <n-descriptions-item :span="3">
        <template #label>
          系统Logo
        </template>
        <img v-if="config.logo" :src="config.logo" alt="系统Logo" style="width: 100px; height: 100px;">
        <NEmpty v-else />
      </n-descriptions-item>
      <n-descriptions-item :span="6">
        <template #label>
          管理员邮箱
        </template>
        {{ config.admin_email }}
      </n-descriptions-item>
      <n-descriptions-item :span="6">
        <template #label>
          网站地址
        </template>
        {{ config.website_url }}
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>
