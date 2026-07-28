import { ref } from 'vue'

const notifications = ref<
  Array<{ id: number; message: string; type: 'info' | 'error' | 'success' }>
>([])
let idCounter = 0

export const useNotification = () => {
  const show = (
    message: string,
    type: 'info' | 'error' | 'success' = 'info',
    duration: number = 3000
  ) => {
    const id = ++idCounter
    notifications.value.push({ id, message, type })

    setTimeout(() => {
      const index = notifications.value.findIndex((n) => n.id === id)
      if (index !== -1) {
        notifications.value.splice(index, 1)
      }
    }, duration)
  }

  const remove = (id: number) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    show,
    remove,
  }
}
