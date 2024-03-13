import { useTheme } from '01_app/providers/ThemeProvider'
import { Navbar } from '03_widgets/Navbar'
import { checkAuth } from '04_features/AuthByEmail/model/service/checkAuth'
import { LOCAL_STORAGE_ACCESS_TOKEN } from '06_shared/const/localstorage'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch } from '06_shared/lib/hooks/StoreHooks'
import { useEffect } from 'react'
import { AppRouter } from './providers/router/ui/AppRouter'


const App = () => {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)){
      console.log(localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN))
      dispatch(checkAuth())
    }
  }, [dispatch])

  return (
    <div className={classNames('app', [theme])}>
      <div className='flex-wrapper'>
        <Navbar />
        <div className='content-page'>
          <AppRouter />
        </div>
      </div>
    </div>
  )
}

export default App
