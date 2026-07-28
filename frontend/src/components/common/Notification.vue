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
      return 'bg-blue-500 text-white'
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="p-4 rounded-lg shadow-lg flex justify-between items-start animate-slide-in"
      :class="getTypeClass(notification.type)"
    >
      <span>{{ notification.message }}</span>
      <button
        @click="remove(notification.id)"
        class="ml-4 text-white hover:text-neutral-200 transition-colors"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
</style>
