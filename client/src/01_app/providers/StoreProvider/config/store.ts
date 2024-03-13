import type { ThunkExtraArg } from './StateSchema'
import { authReducer } from '04_features/AuthByEmail/model/slice/authSlice'
import { deviceReducer } from '05_entities/Device/model/slice/deviceSlice'
import { userReducer } from '05_entities/User/model/slice/userSlice'
import { $api } from '06_shared/api/api'
import { configureStore } from '@reduxjs/toolkit'


const extraArg: ThunkExtraArg = {
  api: $api
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    thunk: {
      extraArgument: extraArg
    }
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


