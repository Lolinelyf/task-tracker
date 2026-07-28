<script setup lang="ts">
import BaseLoader from './BaseLoader.vue'

defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-6 py-2 text-base rounded-lg',
  lg: 'px-8 py-3 text-lg rounded-xl',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      sizeClasses[size || 'md'],
      variant === 'primary'
        ? 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-600'
        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 focus:ring-neutral-400',
    ]"
    @click="$emit('click')"
  >
    <span v-if="loading" class="inline-flex items-center gap-2">
      <BaseLoader :size="size === 'sm' ? 'sm' : 'md'" />
      {{ loadingText || 'Загрузка...' }}
    </span>
    <slot v-else />
  </button>
</template>
