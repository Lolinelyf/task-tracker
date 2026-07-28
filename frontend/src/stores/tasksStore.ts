import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import type { Task } from '../types'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTasks = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<Task[]>('/tasks')
      tasks.value = response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка загрузки задач'
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
  }
})
