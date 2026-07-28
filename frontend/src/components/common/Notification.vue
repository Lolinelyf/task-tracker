<script setup lang="ts">
import { useNotification } from '../../composables/useNotification'

const { notifications, remove } = useNotification()

const getTypeClass = (type: string) => {
  switch (type) {
    case 'error':
      return 'bg-red-500 text-white'
    case 'success':
      return 'bg-green-500 text-white'
    default:
      return 'bg-neutral-900 text-white'
  }
}
</script>

<template>
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
    <div class="space-y-2">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="p-4 rounded-lg shadow-lg flex justify-between items-start animate-slide-in"
        :class="getTypeClass(notification.type)"
      >
        <span class="text-sm break-words flex-1">{{ notification.message }}</span>
        <button
          @click="remove(notification.id)"
          class="ml-4 text-white hover:text-neutral-200 transition-colors flex-shrink-0 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
</style>
