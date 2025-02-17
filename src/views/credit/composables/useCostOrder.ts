import { fetchCostOrder } from '@/service/api/cost'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

export function useCostOrder() {
  const costOrderColumns = computed(() => [
    { title: 'Time', key: 'created_at', render: (row: any) => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss') },
    { title: 'Quota', key: 'quota' },
    { title: 'Description', key: 'description' },
  ])

  const costOrderLoading = ref(false)
  const costOrderTableRef = ref<any>(null)
  const rowKey = (row: any) => row.id
  const costOrder = ref<any[]>([])
  const costOrderPagination = ref({
    page: 1,
    pageCount: 1,
    pageSize: 5,
    onChange: (page: number) => {
      costOrderPagination.value.page = page
      getCostOrder()
    },
    onUpdatePageSize: (pageSize: number) => {
      costOrderPagination.value.pageSize = pageSize
      costOrderPagination.value.page = 1
      getCostOrder()
    },
  })

  async function getCostOrder() {
    try {
      costOrderLoading.value = true

      const { isSuccess, data } = await fetchCostOrder({
        page: costOrderPagination.value.page,
        limit: costOrderPagination.value.pageSize,
      })

      if (!isSuccess) {
        costOrder.value = []
      }
      else {
        costOrder.value = data.orders
        costOrderPagination.value.pageCount = data.total_count
      }
      costOrderLoading.value = false
    }
    catch (error) {
      console.error('[Get Cost Order Error]:', error)
    }
    finally {
      costOrderLoading.value = false
    }
  }

  return {
    costOrderColumns,
    costOrderLoading,
    costOrderTableRef,
    costOrder,
    costOrderPagination,
    rowKey,
    getCostOrder,
  }
}
