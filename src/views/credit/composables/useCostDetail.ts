import dayjs from 'dayjs'
import { computed, ref } from 'vue'

export function useCostDetail() {
  const costDetailColumns = computed(() => [
    { title: '时间', key: 'created_at', render: (row: any) => dayjs(row.created_at).format('YYYY-MM-DD HH:mm:ss') },
    { title: '用户', key: 'username' },
    { title: '模型', key: 'engine_label' },
    { title: '输入 token', key: 'prompt_tokens' },
    { title: '生成 token', key: 'completion_tokens' },
    {
      title: '消耗费用',
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
      //   {
      //     "messages": [
      //         {
      //             "id": 3,
      //             "user_id": 1,
      //             "engine_label": "GPT-4o-mini",
      //             "prompt_tokens": 0,
      //             "completion_tokens": 0,
      //             "cost": "3.0",
      //             "created_at": "2025-02-11T07:03:53.000+08:00",
      //             "username": "zhangsan"
      //         },
      //         {
      //             "id": 2,
      //             "user_id": 2,
      //             "engine_label": "GPT-4o",
      //             "prompt_tokens": 0,
      //             "completion_tokens": 0,
      //             "cost": "4.0",
      //             "created_at": "2025-02-11T07:03:53.000+08:00",
      //             "username": "lisi"
      //         },
      //         {
      //             "id": 1,
      //             "user_id": 1,
      //             "engine_label": "GPT-4o",
      //             "prompt_tokens": 0,
      //             "completion_tokens": 0,
      //             "cost": "3.0",
      //             "created_at": "2025-02-10T07:03:53.000+08:00",
      //             "username": "zhangsan"
      //         }
      //     ],
      //     "total_count": 3
      // }
      // const res = await fetchCostDetail({
      //   page: costDetailPagination.value.page,
      //   limit: costDetailPagination.value.pageSize,
      // })
      const res = {
        data: {
          messages: [
            {
              id: 3,
              user_id: 1,
              engine_label: 'GPT-4o-mini',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '3.0',
              created_at: '2025-02-11T07:03:53.000+08:00',
              username: 'zhangsan',
            },
            {
              id: 2,
              user_id: 2,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '4.0',
              created_at: '2025-02-11T07:03:53.000+08:00',
              username: 'lisi',
            },
            {
              id: 1,
              user_id: 1,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '3.0',
              created_at: '2025-02-10T07:03:53.000+08:00',
              username: 'zhangsan',
            },
            {
              id: 4,
              user_id: 3,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '5.0',
              created_at: '2025-02-12T07:03:53.000+08:00',
              username: 'wangwu',
            },
            {
              id: 5,
              user_id: 2,
              engine_label: 'GPT-4o-mini',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '2.5',
              created_at: '2025-02-12T08:03:53.000+08:00',
              username: 'lisi',
            },
            {
              id: 6,
              user_id: 4,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '4.5',
              created_at: '2025-02-12T09:03:53.000+08:00',
              username: 'zhaoliu',
            },
            {
              id: 7,
              user_id: 1,
              engine_label: 'GPT-4o-mini',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '2.0',
              created_at: '2025-02-12T10:03:53.000+08:00',
              username: 'zhangsan',
            },
            {
              id: 8,
              user_id: 3,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '3.5',
              created_at: '2025-02-12T11:03:53.000+08:00',
              username: 'wangwu',
            },
            {
              id: 9,
              user_id: 4,
              engine_label: 'GPT-4o-mini',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '2.8',
              created_at: '2025-02-12T12:03:53.000+08:00',
              username: 'zhaoliu',
            },
            {
              id: 10,
              user_id: 2,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '4.2',
              created_at: '2025-02-12T13:03:53.000+08:00',
              username: 'lisi',
            },
            {
              id: 11,
              user_id: 1,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '3.8',
              created_at: '2025-02-12T14:03:53.000+08:00',
              username: 'zhangsan',
            },
            {
              id: 12,
              user_id: 3,
              engine_label: 'GPT-4o-mini',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '2.3',
              created_at: '2025-02-12T15:03:53.000+08:00',
              username: 'wangwu',
            },
            {
              id: 13,
              user_id: 4,
              engine_label: 'GPT-4o',
              prompt_tokens: 0,
              completion_tokens: 0,
              cost: '4.7',
              created_at: '2025-02-12T16:03:53.000+08:00',
              username: 'zhaoliu',
            },
          ],
          total_count: 100,
        },
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      costDetail.value = res.data.messages
      costDetailPagination.value.pageCount = Math.ceil(res.data.total_count / costDetailPagination.value.pageSize)
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
