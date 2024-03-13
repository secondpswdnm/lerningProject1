import type { IUser } from '05_entities/User'
import { userActions } from '05_entities/User/model/slice/userSlice'
import { LOCAL_STORAGE_ACCESS_TOKEN } from '06_shared/const/localstorage'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '01_app/providers/StoreProvider'


export const
  logout = createAsyncThunk<number, void, ThunkConfig<string>>(
    'auth/logout',
    async (_, thunkAPI) => {
      const { dispatch, extra, rejectWithValue } = thunkAPI
      try {
        const response = await extra.api.post<number>('/user/logout')

        if(!response.data) {
          throw new Error()
        }

        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN)
        dispatch(userActions.setIsAuth(false))
        dispatch(userActions.setAuthData({} as IUser))
        console.log(response)
        console.log(response.data)
        return response.data
      } catch(e) {
        console.log(e)
        return rejectWithValue('error')
      }
    }
  )