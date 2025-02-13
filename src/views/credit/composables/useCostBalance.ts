import { ref } from 'vue'

export function useCostBalance() {
  const balance = ref<any>({
    balance: '0',
    cost: '0',
  })
  const balanceLoading = ref<boolean>(false)

  const fetchBalance = async () => {
    try {
      balanceLoading.value = true
      // const { isSuccess, data } = await fetchCostBalance()
      // Mock API response
      const mockResponse = {
        isSuccess: true,
        data: {
          balance: '1000',
          cost: '500',
        },
      }
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const { isSuccess, data } = mockResponse
      if (!isSuccess) {
        balance.value = {
          balance: '0',
          cost: '0',
        }
      }
      else {
        balance.value = data
      }
    }
    finally {
      balanceLoading.value = false
    }
  }
  return {
    balance,
    balanceLoading,
    fetchBalance,
  }
}
