import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import type { LoginCredentials, AuthResponse } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<AuthResponse>('/login', credentials)
      const accessToken = response.data.accessToken
      token.value = accessToken
      localStorage.setItem('token', accessToken)
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка авторизации'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  }
})
