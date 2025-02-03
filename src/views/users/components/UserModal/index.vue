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
  password: '',
  password_confirmation: '',
  avatar_url: '',
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
  emit('submit', type, formModel.value)
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
      label-placement="left"
      :model="formModel"
      label-align="left"
      :label-width="80"
      @submit.prevent="handleSubmit"
    >
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="Username" path="username">
          <n-input v-model:value="formModel.username" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Email" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Password" path="password">
          <n-input v-model:value="formModel.password" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="Password Confirmation" path="password_confirmation">
          <n-input v-model:value="formModel.password_confirmation" />
        </n-form-item-grid-item>
      </n-grid>
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
