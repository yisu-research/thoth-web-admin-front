import dayjs from 'dayjs'
import { computed, ref } from 'vue'

export function useCostOrder() {
  const costOrderColumns = computed(() => [
    { title: '时间', key: 'created_at', render: (row: any) => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss') },
    { title: '额度', key: 'quota' },
    { title: '备注', key: 'description' },
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
      //   {
      //     "orders": [
      //         {
      //             "id": 1,
      //             "quota": "20.0",
      //             "description": "活动赠送",
      //             "created_at": "2025-02-13T02:30:47.586Z",
      //             "updated_at": "2025-02-13T02:30:47.586Z"
      //         }
      //     ],
      //     "total_count": 1
      // }
      // const res = await fetchCostOrder({
      //   page: costOrderPagination.value.page,
      //   limit: costOrderPagination.value.pageSize,
      // })
      const res = {
        data: {
          orders: [
            {
              id: 1,
              quota: '20.0',
              description: '活动赠送',
              created_at: '2025-02-13T02:30:47.586Z',
              updated_at: '2025-02-13T02:30:47.586Z',
            },
            {
              id: 2,
              quota: '50.0',
              description: '充值',
              created_at: '2025-02-13T03:15:22.123Z',
              updated_at: '2025-02-13T03:15:22.123Z',
            },
            {
              id: 3,
              quota: '10.0',
              description: '新用户奖励',
              created_at: '2025-02-13T04:22:31.456Z',
              updated_at: '2025-02-13T04:22:31.456Z',
            },
            {
              id: 4,
              quota: '100.0',
              description: '企业充值',
              created_at: '2025-02-13T05:45:12.789Z',
              updated_at: '2025-02-13T05:45:12.789Z',
            },
            {
              id: 5,
              quota: '30.0',
              description: '推荐奖励',
              created_at: '2025-02-13T06:12:44.234Z',
              updated_at: '2025-02-13T06:12:44.234Z',
            },
            {
              id: 6,
              quota: '75.0',
              description: '季度充值',
              created_at: '2025-02-13T07:33:21.567Z',
              updated_at: '2025-02-13T07:33:21.567Z',
            },
            {
              id: 7,
              quota: '15.0',
              description: '活动返现',
              created_at: '2025-02-13T08:41:15.890Z',
              updated_at: '2025-02-13T08:41:15.890Z',
            },
            {
              id: 8,
              quota: '200.0',
              description: '年度套餐',
              created_at: '2025-02-13T09:55:33.123Z',
              updated_at: '2025-02-13T09:55:33.123Z',
            },
            {
              id: 9,
              quota: '25.0',
              description: '邀请奖励',
              created_at: '2025-02-13T10:17:42.456Z',
              updated_at: '2025-02-13T10:17:42.456Z',
            },
            {
              id: 10,
              quota: '45.0',
              description: '月度充值',
              created_at: '2025-02-13T11:28:51.789Z',
              updated_at: '2025-02-13T11:28:51.789Z',
            },
            {
              id: 11,
              quota: '60.0',
              description: '特别优惠',
              created_at: '2025-02-13T12:39:27.234Z',
              updated_at: '2025-02-13T12:39:27.234Z',
            },
          ],
          total_count: 40,
        },
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      costOrder.value = res.data.orders
      costOrderPagination.value.pageCount = res.data.total_count
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
