import type { AuthResponse } from '01_app/providers/StoreProvider/config/StateSchema'
import { userActions } from '05_entities/User/model/slice/userSlice'
import { LOCAL_STORAGE_ACCESS_TOKEN } from '06_shared/const/localstorage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '01_app/providers/StoreProvider'


interface LoginByEmailProps {
  email: string
  password: string
}

export const
  loginByEmail = createAsyncThunk<AuthResponse, LoginByEmailProps, ThunkConfig<string>>(
    'auth/loginByEmail',
    async (user, thunkAPI) => {
      const { extra, rejectWithValue, dispatch } = thunkAPI
      try {
        const response = await extra.api.post<AuthResponse>('/user/login', user)

        if(!response.data) {
          throw new Error()
        }

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, JSON.stringify(response.data.accessToken))
        dispatch(userActions.setAuthData(response.data.user))
        dispatch(userActions.setIsAuth(true))
        console.log(response)
        console.log(response.data)
        return response.data
      } catch(e) {
        console.log(e)
        return rejectWithValue('error')
      }
    }
  )