import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
  const currentPage = ref(1)
  const itemsPerPage = ref(5)
  const totalItems = ref(0)
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))

  const statusFilter = ref<string>('all')
  const searchQuery = ref<string>('')

  const fetchTasks = async () => {
    loading.value = true
    error.value = null

    try {
      const params: Record<string, any> = {
        _page: currentPage.value,
        _limit: itemsPerPage.value,
      }

      if (statusFilter.value !== 'all') {
        params.status = statusFilter.value
      }

      if (searchQuery.value.trim()) {
        params.title_like = searchQuery.value.trim()
      }

      const response = await api.get<Task[]>('/tasks', { params })
      tasks.value = response.data
      totalItems.value = Number(response.headers['x-total-count']) || 0
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка загрузки задач'
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    currentPage.value = page
    fetchTasks()
  }

  const setStatusFilter = (status: string) => {
    statusFilter.value = status
    currentPage.value = 1
    fetchTasks()
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1
    fetchTasks()
  }

  const createTask = async (data: Omit<Task, 'id' | 'createdAt'>) => {
    creating.value = true
    error.value = null

    try {
      const response = await api.post<Task>('/tasks', {
        ...data,
        createdAt: new Date().toISOString(),
      })
      if (currentPage.value === 1) {
        tasks.value.unshift(response.data)
      }
      totalItems.value += 1
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
      totalItems.value -= 1
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
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    statusFilter,
    searchQuery,
    fetchTasks,
    setPage,
    setStatusFilter,
    setSearchQuery,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
  }
})
