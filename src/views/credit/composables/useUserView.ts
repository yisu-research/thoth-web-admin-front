import { computed, h, ref } from 'vue'

export function useCostUser() {
  const costUserColumns = computed(() => [
    { title: '用户', key: 'username' },
    { title: '额度/天', key: 'average_cost' },
    { title: '总额度', key: 'total_cost' },
    {
      title: '总额度占比(%)',
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
      // const res = await fetchCostUser()
      const res = {
        data: [
          {
            username: 'D.Henry',
            total_cost: '7.0',
            average_cost: '3.5',
            proportion: 69,
          },
          {
            username: 'L.Messi',
            total_cost: '3.1',
            average_cost: '3.1',
            proportion: 31,
          },
          {
            username: 'C.Ronaldo',
            total_cost: '2.8',
            average_cost: '1.4',
            proportion: 25,
          },
          {
            username: 'K.De Bruyne',
            total_cost: '4.2',
            average_cost: '2.1',
            proportion: 38,
          },
          {
            username: 'M.Salah',
            total_cost: '3.6',
            average_cost: '1.8',
            proportion: 32,
          },
          {
            username: 'J.Salah',
            total_cost: '5.4',
            average_cost: '2.7',
            proportion: 48,
          },
          {
            username: 'A.Griezmann',
            total_cost: '4.8',
            average_cost: '2.4',
            proportion: 43,
          },
          {
            username: 'M.Neuer',
            total_cost: '2.4',
            average_cost: '1.2',
            proportion: 21,
          },
          {
            username: 'T.Choupo-Moting',
            total_cost: '1.8',
            average_cost: '0.9',
            proportion: 16,
          },
          {
            username: 'M.Lewandowski',
            total_cost: '3.9',
            average_cost: '1.95',
            proportion: 35,
          },
          {
            username: 'K.Benzema',
            total_cost: '4.5',
            average_cost: '2.25',
            proportion: 40,
          },
          {
            username: 'M.Neymar',
            total_cost: '2.2',
            average_cost: '1.1',
            proportion: 20,
          },
        ],
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      costUser.value = res.data
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
