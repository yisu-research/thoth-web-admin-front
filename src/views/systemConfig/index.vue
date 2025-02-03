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
  // configForm.value = null
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
  // console.log('configForm.value', configForm.value)
  try {
    const { isSuccess } = await fetchUpdateSystemConfig(configForm.value)
    if (!isSuccess)
      return

    handleClose()
    getConfig()
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
        Update System Configuration
      </NButton>

      <NModal v-model:show="showModal" title="Update System Configuration" @close="handleClose">
        <NCard title="Update System Configuration" style="width: 600px;">
          <NForm
            :model="configForm"
          >
            <NFormItem label="System Name">
              <NInput v-model:value="configForm.system_name" />
            </NFormItem>
            <NFormItem label="System Logo">
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
            <NFormItem label="Admin Email">
              <NInput v-model:value="configForm.admin_email" />
            </NFormItem>
            <NFormItem label="Website URL">
              <NInput v-model:value="configForm.website_url" />
            </NFormItem>
          </NForm>

          <div>
            <NButton type="primary" @click="handleSubmit">
              Update
            </NButton>
          </div>
        </NCard>
      </NModal>
    </div>
    <n-descriptions label-placement="top" bordered :column="6">
      <n-descriptions-item :span="3">
        <template #label>
          System Name
        </template>
        {{ config.system_name }}
      </n-descriptions-item>
      <n-descriptions-item :span="3">
        <template #label>
          System Logo
        </template>
        <img v-if="config.logo" :src="config.logo" alt="System Logo" style="width: 100px; height: 100px;">
        <NEmpty v-else />
      </n-descriptions-item>
      <n-descriptions-item :span="6">
        <template #label>
          Admin Email
        </template>
        {{ config.admin_email }}
      </n-descriptions-item>
      <n-descriptions-item :span="6">
        <template #label>
          Website URL
        </template>
        {{ config.website_url }}
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>
