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
  username: 'test',
  email: 'test@test.com',
  password: 'mimadh46',
  password_confirmation: 'mimadh46',
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
    add: '添加用户',
    edit: '编辑用户',
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
        <n-form-item-grid-item :span="12" label="用户名" path="username">
          <n-input v-model:value="formModel.username" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="邮箱" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="密码" path="password">
          <n-input v-model:value="formModel.password" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="确认密码" path="password_confirmation">
          <n-input v-model:value="formModel.password_confirmation" />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          取消
        </n-button>
        <n-button type="primary" @click="handleSubmit">
          提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
