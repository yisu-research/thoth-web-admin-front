import { useEcharts } from '@/hooks'
import Decimal from 'decimal.js'
import { ref } from 'vue'

export function useCostChart() {
  const dateRange = ref<[string, string] | null>(null)
  const loading = ref(false)

  const barOptions = ref<any>({
    tooltip: {},
    grid: {
      top: '8%',
      left: '1%',
      right: '1%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: { color: '#f9f9f9' },
      },
      axisLabel: {
        color: '#021413FF',
        margin: 15,
      },
      axisTick: { show: false },
      data: [],
    }],
    yAxis: [{
      type: 'value',
      min: 0,
      splitNumber: 7,
      splitLine: {
        show: true,
        lineStyle: { color: '#A8CFC7FF' },
      },
      axisLine: { show: false },
      axisLabel: {
        margin: 20,
        color: '#011A20FF',
      },
      axisTick: { show: false },
    }],
    series: [{
      name: '额度消耗',
      type: 'bar',
      barWidth: 20,
      tooltip: { show: false },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
      },
      itemStyle: {
        color: () => '#23c891',
      },
      data: [],
    }],
  })

  useEcharts('barRef', barOptions)

  async function getCostQuota() {
    barOptions.value.series[0].data = []
    barOptions.value.xAxis[0].data = []
    try {
      loading.value = true
      //   [
      //     {
      //         "date": "2025-02-09",
      //         "cost": "1.0"
      //     },
      //     {
      //         "date": "2025-02-10",
      //         "cost": "1.1"
      //     }
      // ]
      // const res = await fetchCostConsume({
      //   start_time: dateRange.value?.[0] || '',
      //   end_time: dateRange.value?.[1] || '',
      // })
      const res = {
        data: [
          {
            date: '2025-02-09',
            cost: '1.0',
          },
          {
            date: '2025-02-10',
            cost: '1.1',
          },
          {
            date: '2025-02-11',
            cost: '2.4',
          },
          {
            date: '2025-02-12',
            cost: '13.6',
          },
          {
            date: '2025-02-13',
            cost: '4.1',
          },
          {
            date: '2025-02-14',
            cost: '7.4',
          },
        ],
      }
      await new Promise(resolve => setTimeout(resolve, 1000))

      barOptions.value = {
        ...barOptions.value,
        xAxis: [{
          ...barOptions.value.xAxis[0],
          data: res.data.map((item: any) => item.date),
        }],
        series: [{
          ...barOptions.value.series[0],
          data: res.data.map((item: any) => new Decimal(item.cost).toNumber()),
        }],
      }
    }
    catch (error) {
      console.error('[Get Cost Quota Error]:', error)
    }
    finally {
      loading.value = false
    }
  }

  function handleTimeChange(value: [string, string] | null, isConfirm: boolean = false) {
    dateRange.value = value
    if (isConfirm)
      getCostQuota()
  }

  return {
    dateRange,
    loading,
    barOptions,
    handleTimeChange,
    getCostQuota,
  }
}
