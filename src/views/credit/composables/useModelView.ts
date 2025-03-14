import { fetchCostModel } from '@/service/api/cost'
import { computed, h, ref } from 'vue'

export function useCostModel() {
  const costModelColumns = computed(() => [
    { title: 'Model', key: 'engine_label' },
    { title: 'Quota/Day', key: 'average_cost' },
    { title: 'Total Quota', key: 'total_cost' },
    {
      title: 'Total Quota Ratio(%)',
      key: 'proportion',
      render: (row: any) => {
        return h('div', {
          style: {
            color: '#000',
            fontSize: '12px',
          },
        }, `${row.proportion.toFixed(2)}%`)
      },
      defaultSortOrder: 'ascend',
      sorter: 'default',
    },
  ])

  const costModel = ref<any[]>([])
  const costModelPagination = ref({
    page: 1,
    pageSize: 10,
    itemCount: undefined,
    onChange: (page: number) => {
      costModelPagination.value.page = page
      getCostModel()
    },
    onUpdatePageSize: (pageSize: number) => {
      costModelPagination.value.pageSize = pageSize
      costModelPagination.value.page = 1
      getCostModel()
    },
  })

  async function getCostModel() {
    try {
      const { isSuccess, data } = await fetchCostModel()

      if (!isSuccess) {
        costModel.value = []
      }
      else {
        costModel.value = data
      }
    }
    catch (error) {
      console.error('[Get Cost Model Error]:', error)
    }
  }

  return {
    costModelColumns,
    costModel,
    costModelPagination,
    getCostModel,
  }
}
