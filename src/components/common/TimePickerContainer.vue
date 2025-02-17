<script setup>
import dayjs from 'dayjs'
import { computed, ref, toRefs } from 'vue'

// Component props definition
const props = defineProps({
  dateRange: {
    type: [Array, null], // Date range array or null
    default: null,
  },
})

// Define component events
const emit = defineEmits(['change'])

// Destructure dateRange from props and convert to reactive reference
const { dateRange } = toRefs(props)

// Reactive state
const selectedQuick = ref('') // Currently selected quick option
const range = ref(null) // Static time picker value

// Quick options configuration
const quickOptions = [
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 3 Days', value: 'last3days' },
  { label: 'Last 7 Days', value: 'last7days' },
  { label: 'Last 30 Days', value: 'last30days' },
  { label: 'Current Hour', value: 'currentHour' },
  { label: 'Today', value: 'today' },
  { label: 'Current Week', value: 'currentWeek' },
  { label: 'Current Month', value: 'currentMonth' },
]

// Format date range display
const formatDateRange = computed(() => {
  if (!dateRange.value) {
    return ''
  }
  const [start, end] = dateRange.value
  return `${dayjs(start).format('YYYY-MM-DD HH:mm:ss')} - ${dayjs(end).format('YYYY-MM-DD HH:mm:ss')}`
})

/**
 * Handle quick option selection
 * @param {string} value - Selected quick option value
 */
function handleQuickSelect(value) {
  selectedQuick.value = value

  const start = new Date()
  const end = new Date()

  // Set corresponding time range based on different quick options
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

  // Execute corresponding time range setting function
  setTimeRange[value]?.()

  // Format and emit new date range
  const newDateRange = [
    dayjs(start).format('YYYY-MM-DD HH:mm:ss'),
    dayjs(end).format('YYYY-MM-DD HH:mm:ss'),
  ]

  emit('change', newDateRange, true)

  // Clear static time picker value
  range.value = null
}

/**
 * Handle clear operation
 * Select last 30 days by default after clearing
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
 * Handle time picker display state change
 * @param {boolean} visible - Whether the picker is visible
 */
function showTimePicker(visible) {
  if (!range.value || visible) {
    return
  }

  const [start, end] = range.value
  const startDate = dayjs(start).format('YYYY-MM-DD HH:mm:ss')
  const endDate = dayjs(end).format('YYYY-MM-DD HH:mm:ss')

  emit('change', [startDate, endDate], true)

  // Clear quick option selection state
  selectedQuick.value = ''
}

/**
 * Handle time picker clear
 */
function handleTimePickerClear() {
  range.value = null
  handleClear()
}

// Watch dateRange changes
watch(dateRange, (newVal) => {
  if (!newVal) {
    // Select last 30 days by default when dateRange is null
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
    <!-- Quick Options -->
    <n-space>
      <h2 class="text-lg font-bold">
        Quick Options
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

    <!-- Static Time Selection -->
    <div style="margin-top: 16px">
      <span class="static-time">
        <h2 class="text-lg font-bold text-zinc-800">Static Time</h2>
        <n-tooltip trigger="hover">
          <template #trigger>
            <nova-icon icon="solar:question-circle-broken" class="text-zinc-500" :size="20" />
          </template>
          Select a specific time range
        </n-tooltip>
      </span>
      <n-date-picker
        v-model:value="range"
        type="datetimerange"
        clearable
        style="margin-top: 8px"
        start-placeholder="Select start time"
        end-placeholder="Select end time"
        @update-show="showTimePicker"
        @clear="handleTimePickerClear"
      />
    </div>

    <!-- Bottom Selected Time Display and Action Buttons -->
    <div class="footer">
      <span>
        Selected Time: <span class="text-primaryGreen text-md ml-2 text-16px">{{ formatDateRange }}</span>
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
