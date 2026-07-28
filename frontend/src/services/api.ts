import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { Router } from 'vue-router'

let routerInstance: Router | null = null

export const setRouter = (router: Router) => {
  routerInstance = router
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерсептор для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Интерсептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибок сети (нет соединения)
    if (!error.response) {
      const message = 'Нет соединения с сервером. Проверьте интернет-соединение.'
      // Сохраняем ошибку для отображения через уведомления
      if (routerInstance) {
        // Можно использовать localStorage для передачи ошибки
        localStorage.setItem('network_error', message)
      }
      return Promise.reject({ message })
    }

    // Обработка 401 (не авторизован)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.setItem('session_expired', 'true')
      if (routerInstance) {
        routerInstance.push('/login')
      }
      return Promise.reject({ message: 'Сессия истекла' })
    }

    // Обработка 404 (не найдено)
    if (error.response?.status === 404) {
      return Promise.reject({ message: 'Запись не найдена' })
    }

    // Обработка 422 (валидация)
    if (error.response?.status === 422) {
      const message = error.response?.data?.message || 'Ошибка валидации данных'
      return Promise.reject({ message, details: error.response?.data?.errors })
    }

    // Обработка 500 (ошибка сервера)
    if (error.response?.status >= 500) {
      return Promise.reject({ message: 'Ошибка сервера. Попробуйте позже.' })
    }

    // Остальные ошибки
    return Promise.reject({
      message: error.response?.data?.message || 'Произошла ошибка',
      status: error.response?.status,
    })
  }
)

export default api
