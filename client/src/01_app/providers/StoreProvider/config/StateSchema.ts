import type { AuthSchema } from '04_features/AuthByEmail/model/types/authSchema'
import type { DeviceSchema } from '05_entities/Device/model/types/device'
import type { IUser, UserSchema } from '05_entities/User'
import type { AxiosInstance } from 'axios'



export interface StateSchema {
  user?: UserSchema
  device?: DeviceSchema
  auth?: AuthSchema
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
  user: IUser
}