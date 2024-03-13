import type { AuthResponse } from '01_app/providers/StoreProvider/config/StateSchema'
import { userActions } from '05_entities/User/model/slice/userSlice'
import { LOCAL_STORAGE_ACCESS_TOKEN } from '06_shared/const/localstorage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '01_app/providers/StoreProvider'


export const
  checkAuth = createAsyncThunk<AuthResponse, void, ThunkConfig<string>>(
    'auth/checkAuth',
    async (_, thunkAPI) => {
      const { dispatch, extra, rejectWithValue } = thunkAPI
      try {
        const response = await extra.api.get<AuthResponse>('/user/refresh')

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