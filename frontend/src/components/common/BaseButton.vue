<script setup lang="ts">
import BaseLoader from './BaseLoader.vue'

defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      variant === 'primary'
        ? 'bg-[#1a1a2e] text-white hover:bg-[#2d2d44] focus:ring-[#1a1a2e]'
        : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 focus:ring-neutral-400',
    ]"
    @click="$emit('click')"
  >
    <span v-if="loading" class="inline-flex items-center gap-2">
      <BaseLoader size="sm" />
      {{ loadingText || 'Загрузка...' }}
    </span>
    <slot v-else />
  </button>
</template>
