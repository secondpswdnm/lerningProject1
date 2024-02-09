import { store } from '../config/store'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'



interface StoreProviderProps {
	children?: ReactNode
}


export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props

  return (
    <Provider store={store} >
      {children}
    </Provider>
  )
}
