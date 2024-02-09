export interface IUser {
  email: string
  id: number
  role?: string[]
}

export interface UserSchema {
  authData?: IUser
  isAuth?: boolean
  isLoading?: boolean
  error?: string
}
