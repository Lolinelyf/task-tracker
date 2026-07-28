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

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.setItem('session_expired', 'true')
      if (routerInstance) {
        routerInstance.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default api
