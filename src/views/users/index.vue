<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { ThothSmartAvatar } from '@/components/common'
import { fetchAuditUser, fetchCreateUser, fetchDeleteUser, fetchUpdateUserInfo, fetchUsers } from '@/service'
import { NButton, NPopconfirm, NSpace, NSwitch, NTag, NTime } from 'naive-ui'
import { onMounted, ref } from 'vue'
import UserModal from './components/UserModal/index.vue'

const users = ref<any[]>([])
const userTotal = ref(0)
const usersLoading = ref(false)
const pagination = ref({
  page: 1,
  limit: 10,
})
async function getUsers() {
  try {
    usersLoading.value = true
    const { isSuccess, ...data } = await fetchUsers(pagination.value)

    if (!isSuccess)
      return

    users.value = data.users
    userTotal.value = data.total_count
  }
  catch (error) {
    console.error(error)
  }
  finally {
    usersLoading.value = false
  }
}

function changePage(page: number, size: number) {
  window.$message.success(`分页器:${page},${size}`)
  pagination.value.page = page
  pagination.value.limit = size
  getUsers()
}

const columns: DataTableColumns<Entity.User> = [
  {
    title: '头像',
    align: 'center',
    key: 'avatar',
    render: (row) => {
      return h(ThothSmartAvatar, {
        name: row.username,
        src: row.avatar_url,
        size: 32,
        shape: 'circle',
      })
    },
  },
  {
    title: '用户名',
    align: 'center',
    key: 'username',
  },
  {
    title: '邮箱',
    align: 'center',
    key: 'email',
  },
  {
    title: '角色',
    align: 'center',
    key: 'role',
    render: (row) => {
      return (<NTag type="info">{row.role}</NTag>)
    },
  },
  {
    title: '审核状态',
    align: 'center',
    key: 'approval_status',
    render: (row) => {
      const active = row.approval_status === 'approved'
      return (
        <NSwitch
          value={active}
          disabled={row.approval_status === 'approved'}
          onUpdate:value={(value: boolean) => row.id && handleAuditUser(row.id, value)}
        >
          {{
            checked: () => '已审核',
            unchecked: () => '未审核',
          }}
        </NSwitch>
      )
    },
  },
  {
    title: '创建时间',
    align: 'center',
    key: 'created_at',
    render: (row) => {
      return (<NTime time={row.created_at} type="datetime" />)
    },
  },
  {
    title: '更新时间',
    align: 'center',
    key: 'updated_at',
    render: (row) => {
      return (<NTime time={row.updated_at} type="relative" />)
    },
  },
  {
    title: '操作',
    align: 'center',
    key: 'actions',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => handleEditTable(row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteUser(row.id)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size="small">删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  },
]

async function handleAuditUser(id: number, value: boolean) {
  if (!value) {
    return
  }
  try {
    const { isSuccess } = await fetchAuditUser({ id, params: { approval_status: 'approved' } })
    if (!isSuccess)
      return

    window.$message.success('审核用户成功')
    getUsers()
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUsers()
})

const visible = ref(false)
type ModalType = 'add' | 'edit'
const modalType = ref<ModalType>('add')
function setModalType(type: ModalType) {
  modalType.value = type
}
const editData = ref<any>(null)
function setEditData(data: any) {
  editData.value = data
}

function handleEditTable(row: any) {
  setEditData(row)
  setModalType('edit')
  visible.value = true
}
function handleAddTable() {
  setModalType('add')
  visible.value = true
}
function handleSubmit(type: ModalType, data: any) {
  if (type === 'add') {
    handleCreateUser(data)
  }
  else {
    handleUpdateUser(data)
  }
}

async function handleCreateUser(data: any) {
  try {
    const { isSuccess } = await fetchCreateUser(data)
    if (!isSuccess)
      return

    window.$message.success('创建用户成功')
    getUsers()
  }
  catch (error) {
    console.error(error)
  }
}
async function handleUpdateUser(data: any) {
  try {
    const { isSuccess } = await fetchUpdateUserInfo(data)
    if (!isSuccess)
      return

    window.$message.success('更新用户成功')
    getUsers()
  }
  catch (error) {
    console.error(error)
  }
}

async function handleDeleteUser(id: number) {
  try {
    await fetchDeleteUser({ id })

    window.$message.success('删除用户成功')
    getUsers()
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <NSpace vertical size="large">
    <div class="flex gap-4">
      <NButton type="primary" @click="handleAddTable">
        <template #icon>
          <nova-icon icon="hugeicons:user-add-01" :size="16" />
        </template>
        添加用户
      </NButton>
    </div>
    <NCard>
      <NDataTable :columns="columns" :data="users" :loading="usersLoading" />
      <Pagination :count="userTotal" class="mt-4" @change="changePage" />
      <UserModal v-model:visible="visible" :type="modalType" :modal-data="editData" @submit="handleSubmit" />
    </NCard>
  </NSpace>
</template>
