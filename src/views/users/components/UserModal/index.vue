<script setup lang="ts">
import { computed, ref } from 'vue'

type ModalType = 'add' | 'edit'
interface Props {
  visible: boolean
  type?: ModalType
  modalData?: any
}

const {
  visible,
  type = 'add',
  modalData = null,
} = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', type: ModalType, data: any): void
}
const defaultFormModal: any = {
  username: '',
  email: '',
  quota: 0,
}

const formModel = ref({ ...defaultFormModal })

const modalVisible = computed({
  get() {
    return visible
  },
  set(visible) {
    closeModal(visible)
  },
})

function closeModal(visible = false) {
  emit('update:visible', visible)
}

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'Add User',
    edit: 'Edit User',
  }
  return titles[type]
})

function UpdateFormModelByModalType() {
  const handlers = {
    add: () => {
      formModel.value = { ...defaultFormModal }
    },
    edit: () => {
      if (modalData) {
        formModel.value = { ...modalData }
      }
    },
  }
  handlers[type]()
}

function handleSubmit() {
  // 去除 formModel 中的空值
  const formData = Object.fromEntries(
    Object.entries(formModel.value).filter(([_, value]) => value !== null && value !== undefined),
  )
  emit('submit', type, formData)
}

watch(
  () => visible,
  (newValue) => {
    if (newValue) {
      UpdateFormModelByModalType()
    }
  },
)
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    :mask-closable="false"
    preset="card"
    :title="title"
    class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form
      label-placement="top"
      :model="formModel"
      label-align="left"
      :label-width="80"
      @submit.prevent="handleSubmit"
    >
      <n-form-item label="Username" path="username" width="200px">
        <n-input v-model:value="formModel.username" />
      </n-form-item>
      <n-form-item label="Email" path="email">
        <n-input v-model:value="formModel.email" />
      </n-form-item>
      <n-form-item v-if="type === 'add'" label="Password" path="password">
        <n-input v-model:value="formModel.password" type="password" show-password-on="click" />
      </n-form-item>
      <n-form-item v-if="type === 'add'" label="Password Confirmation" path="password_confirmation">
        <n-input v-model:value="formModel.password_confirmation" type="password" show-password-on="click" />
      </n-form-item>
      <n-form-item v-if="type === 'edit'" label="Quota" path="quota">
        <n-input v-model:value="formModel.quota" type="number" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          Cancel
        </n-button>
        <n-button type="primary" @click="handleSubmit">
          Submit
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
