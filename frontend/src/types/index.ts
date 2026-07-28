export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  user?: {
    email: string
    id: number
  }
}
