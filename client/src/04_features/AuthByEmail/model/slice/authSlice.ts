import { checkAuth } from '04_features/AuthByEmail/model/service/checkAuth'
import { loginByEmail } from '04_features/AuthByEmail/model/service/loginByEmail'
import { logout } from '04_features/AuthByEmail/model/service/logout'
import { registerByEmail } from '04_features/AuthByEmail/model/service/registerByEmail'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { AuthSchema } from '../types/authSchema'


const initialState: AuthSchema = {
  email: '',
  password: '',
  role: ['USER'],
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerByEmail.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(registerByEmail.fulfilled, (state) => {
        state.isLoading = false
        state.email =''
        state.password = ''
        state.role = []
      })
      .addCase(registerByEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(loginByEmail.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false
        state.email =''
        state.password = ''
        state.role = []
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(checkAuth.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(logout.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    getEmail: sliceState => sliceState.email,
    getPassword: sliceState => sliceState.password,
    getAuthInfo: sliceState => sliceState
  }

})

export const { actions: authActions } = authSlice
export const { getEmail, getPassword, getAuthInfo } = authSlice.selectors
export const { reducer: authReducer } = authSlice

