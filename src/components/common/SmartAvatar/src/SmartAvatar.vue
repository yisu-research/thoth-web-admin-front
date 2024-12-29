<script setup lang="ts">
import { computed, ref } from 'vue'
import { getAvatarText } from './utils'

interface Props {
  name?: string
  src?: string
  alt?: string
  size?: 'small' | 'medium' | 'large' | number
  shape?: 'circle' | 'square'
  bgColor?: string
  textColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  shape: 'circle',
  bgColor: '#23c891',
  textColor: '#fff',
})

const imgLoadError = ref(false)

// 预定义的颜色映射
const colorMap: Record<string, string> = {
  A: '#23c891',
  B: '#23c8b4',
  C: '#23b8c8',
  D: '#23a5c8',
  E: '#2391c8',
  F: '#237dc8',
  G: '#2369c8',
  H: '#2355c8',
  I: '#2341c8',
  J: '#2d23c8',
  K: '#4123c8',
  L: '#5523c8',
  M: '#6923c8',
  N: '#7d23c8',
  O: '#9123c8',
  P: '#a523c8',
  Q: '#b923c8',
  R: '#c823b4',
  S: '#c8239b',
  T: '#c82382',
  U: '#c82369',
  V: '#c82350',
  W: '#c82337',
  X: '#c83723',
  Y: '#c85023',
  Z: '#c86923',
}

const sizeMap = {
  small: 24,
  medium: 32,
  large: 40,
}

const displayText = computed(() => {
  return getAvatarText(props.name)
})

const backgroundColor = computed(() => {
  if (props.bgColor) {
    return props.bgColor
  }
  return colorMap[displayText.value[0] as keyof typeof colorMap] || '#23c891'
})

// 计算样式
const avatarStyle = computed(() => {
  const size = typeof props.size === 'number'
    ? props.size
    : sizeMap[props.size]

  return {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    fontSize: `${Math.floor(size / 2)}px`,
    backgroundColor: !props.src || imgLoadError.value ? backgroundColor.value : 'transparent',
    color: props.textColor,
  }
})

// 处理图片加载错误
function handleImgError() {
  imgLoadError.value = true
}
</script>

<template>
  <div class="smart-avatar" :class="[shape, size]" :style="avatarStyle">
    <template v-if="src">
      <img :src="src" :alt="alt" @error="handleImgError">
    </template>
    <template v-else>
      {{ displayText }}
    </template>
  </div>
</template>

<style scoped>
.smart-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  user-select: none;
}

.circle {
  border-radius: 50%;
}

.square {
  border-radius: 4px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
