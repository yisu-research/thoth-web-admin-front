import { computed, h, ref } from 'vue'

export function useCostModel() {
  const costModelColumns = computed(() => [
    { title: '模型', key: 'engine_label' },
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
      // const res = await fetchCostModel()
      const res = {
        data: [
          {
            engine_label: 'GPT-4o',
            total_cost: '7.0',
            average_cost: '3.5',
            proportion: 69,
          },
          {
            engine_label: 'GPT-4o-mini',
            total_cost: '3.1',
            average_cost: '3.1',
            proportion: 31,
          },
          {
            engine_label: 'GPT-3.5-turbo',
            total_cost: '2.8',
            average_cost: '1.4',
            proportion: 25,
          },
          {
            engine_label: 'Claude-2',
            total_cost: '4.2',
            average_cost: '2.1',
            proportion: 38,
          },
          {
            engine_label: 'PaLM-2',
            total_cost: '3.6',
            average_cost: '1.8',
            proportion: 32,
          },
          {
            engine_label: 'DALL-E 3',
            total_cost: '5.4',
            average_cost: '2.7',
            proportion: 48,
          },
          {
            engine_label: 'Stable Diffusion XL',
            total_cost: '4.8',
            average_cost: '2.4',
            proportion: 43,
          },
          {
            engine_label: 'Llama-2',
            total_cost: '2.4',
            average_cost: '1.2',
            proportion: 21,
          },
          {
            engine_label: 'Mistral-7B',
            total_cost: '1.8',
            average_cost: '0.9',
            proportion: 16,
          },
          {
            engine_label: 'Falcon-40B',
            total_cost: '3.9',
            average_cost: '1.95',
            proportion: 35,
          },
          {
            engine_label: 'CodeLlama-34B',
            total_cost: '4.5',
            average_cost: '2.25',
            proportion: 40,
          },
          {
            engine_label: 'Anthropic Claude-instant',
            total_cost: '2.2',
            average_cost: '1.1',
            proportion: 20,
          },
        ],
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      costModel.value = res.data
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
