import type { LoginFormProps } from '04_features/AuthByEmail/ui/LoginForm/LoginForm'
import type { FC } from 'react'
import { lazy } from 'react'


export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () => import('./LoginForm')
)