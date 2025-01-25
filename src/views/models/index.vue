<script setup lang="tsx">
import type { DataTableColumns } from 'naive-ui'
import { fetchModelList, fetchUpdateModel } from '@/service'
import { NSpace, NSwitch } from 'naive-ui'
import { onMounted, ref } from 'vue'

const models = ref<any[]>([])
const modelTotal = ref(0)
const modelsLoading = ref(false)
const pagination = ref({
  page: 1,
  limit: 10,
})

async function getModels() {
  try {
    modelsLoading.value = true
    const { isSuccess, ...data } = await fetchModelList(pagination.value)

    if (!isSuccess)
      return

    models.value = data.engines
    modelTotal.value = data.total_count
  }
  catch (error) {
    console.error(error)
  }
  finally {
    modelsLoading.value = false
  }
}

function changePage(page: number, size: number) {
  window.$message.success(`分页器:${page},${size}`)
  pagination.value.page = page
  pagination.value.limit = size
  getModels()
}

const columns: DataTableColumns<any> = [
  {
    title: 'Icon',
    align: 'center',
    key: 'icon_url',
    render: (row) => {
      return h('img', {
        src: row.icon_url,
        class: 'w-8 h-8',
      })
    },
  },
  {
    title: '模型名称',
    align: 'center',
    key: 'label',
  },
  {
    title: '价格',
    align: 'center',
    key: 'price',
  },
  {
    title: '模型描述',
    align: 'center',
    key: 'description',
  },
  {
    title: '是否启用',
    align: 'center',
    key: 'is_enable',
    render: (row) => {
      return h(NSwitch, {
        value: row.is_enable,
        onChange: value => updateModel(row, 'is_enable', value),
      })
    },
  },
  {
    title: '是否推荐',
    align: 'center',
    key: 'is_recommend',
    render: (row) => {
      return h(NSwitch, {
        value: row.is_recommend,
        onChange: value => updateModel(row, 'is_recommend', value),
      })
    },
  },
]

async function updateModel(row: any, key: string, value: boolean) {
  try {
    const { isSuccess } = await fetchUpdateModel({ id: row.id, [key]: value })
    if (!isSuccess)
      return

    window.$message.success('更新模型成功')
    getModels()
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getModels()
})
</script>

<template>
  <NSpace vertical size="large">
    <NCard>
      <NDataTable :columns="columns" :data="models" :loading="modelsLoading" />
      <Pagination :count="modelTotal" class="mt-4" @change="changePage" />
    </NCard>
  </NSpace>
</template>
