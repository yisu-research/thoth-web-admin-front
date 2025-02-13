<script setup>
import dayjs from 'dayjs'
import { computed, ref, toRefs } from 'vue'

// 组件属性定义
const props = defineProps({
  dateRange: {
    type: [Array, null], // 日期范围数组或 null
    default: null,
  },
})

// 定义组件事件
const emit = defineEmits(['change'])

// 解构 props 中的 dateRange 并转为响应式引用
const { dateRange } = toRefs(props)

// 响应式状态
const selectedQuick = ref('') // 当前选中的快捷选项
const range = ref(null) // 静态时间选择器的值

// 快捷选项配置
const quickOptions = [
  { label: '昨天', value: 'yesterday' },
  { label: '最近3天', value: 'last3days' },
  { label: '最近7天', value: 'last7days' },
  { label: '最近30天', value: 'last30days' },
  { label: '本小时', value: 'currentHour' },
  { label: '当天', value: 'today' },
  { label: '本周', value: 'currentWeek' },
  { label: '本月', value: 'currentMonth' },
]

// 格式化日期范围显示
const formatDateRange = computed(() => {
  if (!dateRange.value) {
    return ''
  }
  const [start, end] = dateRange.value
  return `${dayjs(start).format('YYYY-MM-DD HH:mm:ss')} - ${dayjs(end).format('YYYY-MM-DD HH:mm:ss')}`
})

/**
 * 处理快捷选项选择
 * @param {string} value - 选中的快捷选项值
 */
function handleQuickSelect(value) {
  selectedQuick.value = value

  const start = new Date()
  const end = new Date()

  // 根据不同的快捷选项设置对应的时间范围
  const setTimeRange = {
    yesterday: () => {
      start.setDate(start.getDate() - 1)
      start.setHours(0, 0, 0, 0)
      end.setDate(end.getDate() - 1)
      end.setHours(23, 59, 59, 999)
    },
    last3days: () => {
      start.setDate(start.getDate() - 2)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    },
    last7days: () => {
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    },
    last30days: () => {
      start.setDate(start.getDate() - 29)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    },
    currentHour: () => {
      start.setMinutes(0, 0, 0)
      end.setMinutes(59, 59, 999)
    },
    today: () => {
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    },
    currentWeek: () => {
      const day = start.getDay() || 7
      start.setDate(start.getDate() - day + 1)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    },
    currentMonth: () => {
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    },
  }

  // 执行对应的时间范围设置函数
  setTimeRange[value]?.()

  // 格式化并发送新的日期范围
  const newDateRange = [
    dayjs(start).format('YYYY-MM-DD HH:mm:ss'),
    dayjs(end).format('YYYY-MM-DD HH:mm:ss'),
  ]

  emit('change', newDateRange, true)

  // 清空静态时间选择器的值
  range.value = null
}

/**
 * 处理清空操作
 * 清空后默认选中最近30天
 */
function handleClear() {
  range.value = null
  selectedQuick.value = 'last30days'

  const start = new Date()
  const end = new Date()
  start.setDate(start.getDate() - 30)
  start.setHours(0, 0, 0, 0)
  end.setHours(23, 59, 59, 999)

  emit('change', [
    dayjs(start).format('YYYY-MM-DD HH:mm:ss'),
    dayjs(end).format('YYYY-MM-DD HH:mm:ss'),
  ], true)
}

/**
 * 处理时间选择器显示状态变化
 * @param {boolean} visible - 选择器是否可见
 */
function showTimePicker(visible) {
  if (!range.value || visible) {
    return
  }

  const [start, end] = range.value
  const startDate = dayjs(start).format('YYYY-MM-DD HH:mm:ss')
  const endDate = dayjs(end).format('YYYY-MM-DD HH:mm:ss')

  emit('change', [startDate, endDate], true)

  // 清空快捷选项的选中状态
  selectedQuick.value = ''
}

/**
 * 处理时间选择器清空
 */
function handleTimePickerClear() {
  range.value = null
  handleClear()
}

// 监听 dateRange 变化
watch(dateRange, (newVal) => {
  if (!newVal) {
    // dateRange 为 null 时,默认选中最近30天
    selectedQuick.value = 'last30days'

    const start = new Date()
    const end = new Date()
    start.setDate(start.getDate() - 30)
    start.setHours(0, 0, 0, 0)
    end.setHours(23, 59, 59, 999)

    emit('change', [
      dayjs(start).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(end).format('YYYY-MM-DD HH:mm:ss'),
    ], true)
  }
}, { immediate: true })
</script>

<template>
  <div>
    <!-- 快捷选项 -->
    <n-space>
      <h2 class="text-lg font-bold">
        快捷选项
      </h2>
      <n-button-group>
        <n-button
          v-for="(item, index) in quickOptions"
          :key="index"
          :type="selectedQuick === item.value ? 'primary' : 'default'"
          @click="handleQuickSelect(item.value)"
        >
          {{ item.label }}
        </n-button>
      </n-button-group>
    </n-space>

    <!-- 静态时间选择 -->
    <div style="margin-top: 16px">
      <span class="static-time">
        <h2 class="text-lg font-bold text-zinc-800">静态时间</h2>
        <n-tooltip trigger="hover">
          <template #trigger>
            <nova-icon icon="solar:question-circle-broken" class="text-zinc-500" :size="20" />
          </template>
          选择特定的时间范围
        </n-tooltip>
      </span>
      <n-date-picker
        v-model:value="range"
        type="datetimerange"
        clearable
        style="margin-top: 8px"
        start-placeholder="请选择开始时间"
        end-placeholder="请选择结束时间"
        @update-show="showTimePicker"
        @clear="handleTimePickerClear"
      />
    </div>

    <!-- 底部已选时间展示和操作按钮 -->
    <div class="footer">
      <span>
        已选时间: <span class="text-primaryGreen text-md ml-2 text-16px">{{ formatDateRange }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.time-picker-container {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
}

.static-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
}

.footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: 8px;
}
</style>
