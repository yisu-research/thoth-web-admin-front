import { fetchCostDetail } from '@/service/api/cost'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

export function useCostDetail() {
  const costDetailColumns = computed(() => [
    { title: 'Time', key: 'created_at', render: (row: any) => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss') },
    { title: 'User', key: 'username' },
    { title: 'Model', key: 'engine_label' },
    { title: 'Input Tokens', key: 'prompt_tokens' },
    { title: 'Output Tokens', key: 'completion_tokens' },
    {
      title: 'Cost',
      key: 'cost',
      render: (row: any) => `$ ${row.cost}`,
    },
  ])

  const costDetailLoading = ref(false)
  const costDetailTableRef = ref<any>(null)
  const rowKey = (row: any) => row.id
  const costDetail = ref<any[]>([])
  const costDetailPagination = ref({
    page: 1,
    pageCount: 1,
    pageSize: 5,
    onChange: (page: number) => {
      costDetailPagination.value.page = page
      getCostDetail()
    },
    onUpdatePageSize: (pageSize: number) => {
      costDetailPagination.value.pageSize = pageSize
      costDetailPagination.value.page = 1
      getCostDetail()
    },
  })

  async function getCostDetail() {
    try {
      costDetailLoading.value = true

      const { isSuccess, data } = await fetchCostDetail({
        page: costDetailPagination.value.page,
        limit: costDetailPagination.value.pageSize,
      })

      if (!isSuccess) {
        costDetail.value = []
      }
      else {
        costDetail.value = data.messages
        costDetailPagination.value.pageCount = Math.ceil(data.total_count / costDetailPagination.value.pageSize)
      }
    }
    catch (error) {
      console.error('[Get Cost Detail Error]:', error)
    }
    finally {
      costDetailLoading.value = false
    }
  }

  return {
    costDetailColumns,
    costDetail,
    costDetailPagination,
    costDetailLoading,
    costDetailTableRef,
    rowKey,
    getCostDetail,
  }
}
