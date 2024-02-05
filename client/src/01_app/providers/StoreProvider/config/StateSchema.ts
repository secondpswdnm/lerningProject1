import type { LoginSchema } from '04_features/AuthByEmail/model/types/loginSchema'
import type { DeviceSchema } from '05_entities/Device/model/types/device'
import type { IUser, UserSchema } from '05_entities/User'
import type { AxiosInstance } from 'axios'



export interface StateSchema {
  user?: UserSchema
  device?: DeviceSchema
  login?: LoginSchema
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}