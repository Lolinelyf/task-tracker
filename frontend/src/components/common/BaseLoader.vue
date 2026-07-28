<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    class="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
    :class="{
      'w-4 h-4 border-2': size === 'sm',
      'w-6 h-6 border-3': size === 'md',
      'w-8 h-8 border-4': size === 'lg',
    }"
  />
</template>
