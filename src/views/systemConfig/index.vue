<script setup lang="ts">
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import { fetchSystemConfig, fetchUpdateSystemConfig } from '@/service/api/config'

const config = ref<any>({
  system_name: '',
  logo: '',
  admin_email: '',
  website_url: '',
  quota: 0,
  currency_display: 'money',
  exchange_rate: '',
  registration_approval_mode: 'auto',
})
const configForm = ref<any>(null)
const showModal = ref(false)

// const token = localStorage.getItem('accessToken')

async function getConfig() {
  try {
    const { isSuccess, data }: any = await fetchSystemConfig()
    if (!isSuccess)
      return

    config.value = {
      system_name: data.system_name,
      logo: data.logo?.url || '',
      admin_email: data.admin_email,
      website_url: data.website_url,
      quota: data.quota,
      currency_display: data.currency_display || 'money',
      exchange_rate: data.exchange_rate || '',
      registration_approval_mode: data.registration_approval_mode || 'auto',
    }
  }
  catch (error) {
    console.error('Failed to fetch system config:', error)
  }
}

function handleClose() {
  showModal.value = false
}

const fileListLengthRef = ref(0)
const uploadRef = ref<UploadInst | null>(null)

function handleChange(options: { fileList: UploadFileInfo[], file: UploadFileInfo }) {
  fileListLengthRef.value = options.fileList.length
  configForm.value.logo = options.file.file
}

const defaultFileList = ref<UploadFileInfo[]>([])

function openModal() {
  showModal.value = true
  configForm.value = config.value
  defaultFileList.value = [{
    id: '1',
    name: 'logo',
    url: config.value.logo,
    status: 'finished',
  }]
}

async function handleSubmit() {
  const formData = new FormData()
  formData.append('system_name', configForm.value.system_name)
  formData.append('admin_email', configForm.value.admin_email)
  formData.append('website_url', configForm.value.website_url)
  if (configForm.value.logo instanceof File) {
    formData.append('logo', configForm.value.logo)
  }
  formData.append('quota', configForm.value.quota)
  formData.append('currency_display', configForm.value.currency_display)
  formData.append('exchange_rate', configForm.value.exchange_rate)
  formData.append('registration_approval_mode', configForm.value.registration_approval_mode)

  try {
    const { isSuccess } = await fetchUpdateSystemConfig(formData)
    if (!isSuccess)
      return

    window.$message?.success('Update system config successfully')

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
            <NFormItem label="System Name" path="system_name">
              <NInput v-model:value="configForm.system_name" />
            </NFormItem>
            <NFormItem label="System Logo" path="logo">
              <NUpload
                ref="uploadRef"
                :default-upload="false"
                :max="1"
                :default-file-list="defaultFileList"
                list-type="image-card"
                @change="handleChange"
              />
            </NFormItem>
            <NFormItem label="Admin Email" path="admin_email">
              <NInput v-model:value="configForm.admin_email" />
            </NFormItem>
            <NFormItem label="Website URL" path="website_url">
              <NInput v-model:value="configForm.website_url" />
            </NFormItem>
            <NFormItem label="Quota" path="quota">
              <NInputNumber v-model:value="configForm.quota" />
            </NFormItem>
            <NFormItem label="Currency Display" path="currency_display">
              <NRadioGroup v-model:value="configForm.currency_display">
                <NRadio value="money">
                  money
                </NRadio>
                <NRadio value="credits">
                  credits
                </NRadio>
              </NRadioGroup>
            </NFormItem>
            <NFormItem label="Exchange Rate" path="exchange_rate">
              <NInput v-model:value="configForm.exchange_rate" />
            </NFormItem>
            <NFormItem label="Registration Approval Mode" path="registration_approval_mode">
              <NRadioGroup v-model:value="configForm.registration_approval_mode">
                <NRadio value="auto">
                  auto
                </NRadio>
                <NRadio value="manual">
                  manual
                </NRadio>
              </NRadioGroup>
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
      <n-descriptions-item :span="6">
        <template #label>
          Quota
        </template>
        {{ config.quota }}
      </n-descriptions-item>
      <n-descriptions-item :span="3">
        <template #label>
          消费显示模式 (Currency Display)
        </template>
        {{ config.currency_display }}
      </n-descriptions-item>
      <n-descriptions-item :span="3">
        <template #label>
          美元积分转换倍率 (Exchange Rate)
        </template>
        {{ config.exchange_rate }}
      </n-descriptions-item>
      <n-descriptions-item :span="6">
        <template #label>
          注册审核模式 (Registration Approval Mode)
        </template>
        {{ config.registration_approval_mode }}
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>
