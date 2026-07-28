<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{
  open: boolean
  title?: string
  message?: string
  loading?: boolean
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50" @click="$emit('cancel')" />

      <div class="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h2 class="text-xl font-bold text-neutral-900 mb-2">
          {{ title || 'Подтверждение' }}
        </h2>
        <p class="text-neutral-600 mb-6">
          {{ message || 'Вы уверены, что хотите выполнить это действие?' }}
        </p>

        <div class="flex gap-2 justify-end">
          <BaseButton variant="secondary" @click="$emit('cancel')" :disabled="loading">
            Отмена
          </BaseButton>
          <BaseButton variant="primary" @click="$emit('confirm')" :loading="loading">
            Удалить
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
