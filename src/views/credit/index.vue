<script setup lang="ts">
import TimePickerContainer from '@/components/common/TimePickerContainer.vue'
import { onMounted } from 'vue'
import { useCostBalance } from './composables/useCostBalance'
import { useCostChart } from './composables/useCostChart'
import { useCostDetail } from './composables/useCostDetail'
import { useCostOrder } from './composables/useCostOrder'
import { useCostModel } from './composables/useModelView'
import { useCostUser } from './composables/useUserView'

const { balance, fetchBalance } = useCostBalance()
const { dateRange, loading, barOptions, handleTimeChange } = useCostChart()
const { costModelColumns, costModel, costModelPagination, getCostModel } = useCostModel()
const { costUserColumns, costUser, costUserPagination, getCostUser } = useCostUser()
const { costDetailColumns, costDetail, costDetailPagination, getCostDetail, costDetailLoading, costDetailTableRef, rowKey } = useCostDetail()
const { costOrderColumns, costOrder, costOrderPagination, getCostOrder, costOrderLoading, costOrderTableRef, rowKey: costOrderRowKey } = useCostOrder()
onMounted(() => {
  Promise.all([
    fetchBalance(),
    getCostModel(),
    getCostUser(),
    getCostDetail(),
    getCostOrder(),
  ])
})
</script>

<template>
  <div class="p-4">
    <!-- 积分管理 -->
    <div class="flex items-center gap-4 w-full border rounded-xl p-4 border-teal-800/10 shadow-zinc-200 shadow-sm">
      <h2 class="text-lg font-bold text-zinc-500">
        剩余额度:
      </h2>
      <span class="text-xl font-bold text-zinc-600">{{ `$${balance?.balance}` }}</span>
    </div>

    <div class="my-4 border rounded-xl p-4 border-teal-800/10 shadow-zinc-200 shadow-sm">
      <h2 class="text-lg text-zinc-500 mb-4 font-bold">
        额度消耗
      </h2>
      <div class="">
        <TimePickerContainer
          :date-range="dateRange"
          @change="handleTimeChange"
        />
        <div class="h-400px w-full flex items-center justify-center mt-4">
          <div v-if="loading">
            <n-spin>
              <template #description>
                加载中...
              </template>
            </n-spin>
          </div>
          <div v-else-if="!loading && (!barOptions.series[0].data?.length)">
            <n-empty description="暂无数据" />
          </div>
          <div v-show="!loading && barOptions.series[0].data?.length" class="h-400px w-full">
            <div
              ref="barRef"
              class="h-400px"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="my-4 border rounded-xl p-4 border-teal-800/10 shadow-zinc-200 shadow-sm">
      <h2 class="text-lg text-zinc-500 mb-4 font-bold">
        模型视角
      </h2>
      <n-data-table
        :columns="costModelColumns as any"
        :data="costModel"
        :pagination="costModelPagination"
        :bordered="false"
      />
    </div>

    <div class="my-4 border rounded-xl p-4 border-teal-800/10 shadow-zinc-200 shadow-sm">
      <h2 class="text-lg text-zinc-500 mb-4 font-bold">
        用户视角
      </h2>
      <n-data-table
        :columns="costUserColumns as any"
        :data="costUser"
        :pagination="costUserPagination"
        :bordered="false"
      />
    </div>

    <div class="my-4 border rounded-xl p-4 border-teal-800/10 shadow-zinc-200 shadow-sm">
      <h2 class="text-lg text-zinc-500 mb-4 font-bold">
        消耗明细
      </h2>
      <n-data-table
        ref="costDetailTableRef"
        remote
        :columns="costDetailColumns as any"
        :data="costDetail"
        :loading="costDetailLoading"
        :pagination="costDetailPagination"
        :row-key="rowKey"
        :bordered="false"
      />
    </div>

    <div class="my-4 border rounded-xl p-4 border-teal-800/10 shadow-zinc-200 shadow-sm">
      <h2 class="text-lg text-zinc-500 mb-4 font-bold">
        充值记录
      </h2>
      <n-data-table
        ref="costOrderTableRef"
        remote
        :columns="costOrderColumns as any"
        :data="costOrder"
        :loading="costOrderLoading"
        :pagination="costOrderPagination"
        :row-key="costOrderRowKey"
        :bordered="false"
      />
    </div>
  </div>
</template>
