<script setup lang="ts">
import BaseButton from './common/BaseButton.vue'

defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'update:page', page: number): void
}>()
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-6">
    <BaseButton
      variant="secondary"
      size="sm"
      :disabled="currentPage === 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      Назад
    </BaseButton>

    <span class="text-sm text-neutral-600"> Страница {{ currentPage }} из {{ totalPages }} </span>

    <BaseButton
      variant="secondary"
      size="sm"
      :disabled="currentPage === totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      Вперёд
    </BaseButton>
  </div>
</template>
