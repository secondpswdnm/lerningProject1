import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { IUser, UserSchema } from '../types/user'


const initialState: UserSchema = {
  isAuth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    }
  },
  selectors: {
    selectEmail: (sliceState) => sliceState.authData?.email,
    selectIsAuth: (sliceState) => sliceState.isAuth,
    selectIsAdmin: (sliceState) => sliceState.authData?.role?.includes('ADMIN'),
    selectUserData: (sliceState) => sliceState.authData
  }


})

export const { actions: userActions } = userSlice
export const { selectEmail, selectIsAuth, selectIsAdmin, selectUserData } = userSlice.selectors
export const { reducer: userReducer } = userSlice

