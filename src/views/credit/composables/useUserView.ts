import { fetchCostUser } from '@/service/api/cost'
import { computed, h, ref } from 'vue'

export function useCostUser() {
  const costUserColumns = computed(() => [
    { title: 'User', key: 'username' },
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

  const costUser = ref<any[]>([])
  const costUserPagination = ref({
    page: 1,
    pageSize: 10,
    itemCount: undefined,
    onChange: (page: number) => {
      costUserPagination.value.page = page
      getCostUser()
    },
    onUpdatePageSize: (pageSize: number) => {
      costUserPagination.value.pageSize = pageSize
      costUserPagination.value.page = 1
      getCostUser()
    },
  })

  async function getCostUser() {
    try {
      const { isSuccess, data } = await fetchCostUser()

      if (!isSuccess) {
        costUser.value = []
      }
      else {
        costUser.value = data
      }
    }
    catch (error) {
      console.error('[Get Cost User Error]:', error)
    }
  }

  return {
    costUserColumns,
    costUser,
    costUserPagination,
    getCostUser,
  }
}
