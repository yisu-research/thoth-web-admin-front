import { fetchCostBalance } from '@/service/api/cost'
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
      const { isSuccess, data } = await fetchCostBalance()

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
    catch (error) {
      console.error('[Get Cost Balance Error]:', error)
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
