import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { LoginSchema } from '../types/loginSchema'


const initialState: LoginSchema = {
  email: '',
  password: ''
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
  selectors: {
    getEmail: sliceState => sliceState.email,
    getPassword: sliceState => sliceState.password,
    getLoginInfo: sliceState => sliceState
  }

})

export const { actions: loginActions } = loginSlice
export const { getEmail, getPassword, getLoginInfo } = loginSlice.selectors
export const { reducer: loginReducer } = loginSlice

