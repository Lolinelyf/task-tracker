import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import type { Task } from '../types'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const creating = ref(false)
  const updating = ref(false)
  const deleting = ref(false)
  const changingStatus = ref(false)

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

  const updateTask = async (id: number, data: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    updating.value = true
    error.value = null

    try {
      const response = await api.patch<Task>(`/tasks/${id}`, data)
      const index = tasks.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
      return { success: true, task: response.data }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка обновления задачи'
      error.value = message
      return { success: false, error: message }
    } finally {
      updating.value = false
    }
  }

  const deleteTask = async (id: number) => {
    deleting.value = true
    error.value = null

    try {
      await api.delete(`/tasks/${id}`)
      tasks.value = tasks.value.filter((t) => t.id !== id)
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка удаления задачи'
      error.value = message
      return { success: false, error: message }
    } finally {
      deleting.value = false
    }
  }

  const changeTaskStatus = async (id: number, status: Task['status']) => {
    changingStatus.value = true
    error.value = null

    try {
      const response = await api.patch<Task>(`/tasks/${id}`, { status })
      const index = tasks.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
      return { success: true, task: response.data }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Ошибка изменения статуса'
      error.value = message
      return { success: false, error: message }
    } finally {
      changingStatus.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    creating,
    updating,
    deleting,
    changingStatus,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
  }
})
