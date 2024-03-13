
export type Role = 'USER' | 'ADMIN'

export interface AuthSchema {
  email: string
  password: string
  role: Role[]
  isLoading: boolean
  error?: string
}