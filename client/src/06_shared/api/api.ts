import type { AuthResponse } from '01_app/providers/StoreProvider/config/StateSchema'
import { LOCAL_STORAGE_ACCESS_TOKEN } from '06_shared/const/localstorage'
import axios from 'axios'


export const API_URL = 'http://192.168.1.245:7000/api'

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  if(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)}`
    return config
  }
  return config

})

$api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config
  if(error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true })
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, response.data.accessToken)
      return $api.request(originalRequest)
    } catch(e) {
      console.log('Unauthorized')
    }
  }
  throw error
})