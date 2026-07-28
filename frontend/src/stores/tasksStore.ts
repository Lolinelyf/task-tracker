import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import type { Task } from '../types'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const creating = ref(false)

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

  const createTask = async (data: Omit<Task, 'id' | 'createdAt'>) => {
    creating.value = true
    error.value = null

    try {
      const response = await api.post<Task>('/tasks', {
        ...data,
        createdAt: new Date().toISOString(),
      })
      tasks.value.unshift(response.data)
      return { success: true, task: response.data }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка создания задачи'
      error.value = message
      return { success: false, error: message }
    } finally {
      creating.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    creating,
    fetchTasks,
    createTask,
  }
})
