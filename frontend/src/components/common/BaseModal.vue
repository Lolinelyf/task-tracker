<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Оверлей -->
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />

      <!-- Модальное окно -->
      <div
        class="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-neutral-900">{{ title || 'Новая задача' }}</h2>
          <button
            class="text-neutral-500 hover:text-neutral-900 transition-colors text-2xl"
            @click="$emit('close')"
            type="button"
          >
            ×
          </button>
        </div>

        <slot />
      </div>
    </div>
  </Teleport>
</template>
