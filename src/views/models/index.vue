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
    const { isSuccess, data } = await fetchModelList(pagination.value)

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

function formatPrice(price: string) {
  const [input, output] = price.split(',')
  return {
    input,
    output,
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
    width: 100,
    fixed: 'left',
    render: (row) => {
      return h('img', {
        src: row.icon_url,
        class: 'size-10 rounded-xl object-cover p-1 flex-shrink-0',
      })
    },
  },
  {
    title: 'Model Name',
    align: 'center',
    key: 'label',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'Price',
    align: 'center',
    width: 200,
    key: 'price_intro',
    render: (row) => {
      const { input, output } = formatPrice(row.price_intro)
      return h('div', {
        class: 'flex flex-col',
      }, [
        h('span', {
          class: 'text-zinc-500',
        }, [input]),
        h('span', {
          class: 'text-zinc-500',
        }, [output]),
      ])
    },
  },
  {
    title: 'Tags',
    align: 'center',
    width: 300,
    key: 'tags',
    render: (row) => {
      return h('div', {
        class: 'flex flex-wrap gap-2',
      }, [row.tags.split('|').map((tag: string) => h('span', { class: 'px-2 py-1 rounded-md bg-emerald-100 text-emerald-800' }, [tag])),
      ])
    },
  },
  {
    title: 'Model Description',
    align: 'center',
    key: 'description',
    width: 300,
  },
  {
    title: 'Enabled',
    align: 'center',
    key: 'is_enable',
    width: 100,
    fixed: 'right',
    render: (row) => {
      return h(NSwitch, {
        value: row.is_enable,
        onChange: value => updateModel(row, 'is_enable', value),
      })
    },
  },
  {
    title: 'Recommended',
    align: 'center',
    key: 'is_recommend',
    width: 100,
    fixed: 'right',
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

    window.$message.success('Update model successfully')
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
      <NDataTable :columns="columns" :data="models" :loading="modelsLoading" :scroll-x="1800" />
      <Pagination :count="modelTotal" class="mt-4" @change="changePage" />
    </NCard>
  </NSpace>
</template>
