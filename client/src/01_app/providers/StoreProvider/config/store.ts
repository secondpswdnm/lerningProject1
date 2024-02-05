import { loginReducer } from '04_features/AuthByEmail/model/slice/loginSlice'
import { deviceReducer } from '05_entities/Device/model/slice/deviceSlice'
import { userReducer } from '05_entities/User/model/slice/userSlice'
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    login: loginReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


