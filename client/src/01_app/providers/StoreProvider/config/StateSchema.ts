



export interface UserSchema {
  id: string
  email: string
  roles: string[]
  isAuth: boolean
}


export interface StateSchema {
  user: UserSchema
}