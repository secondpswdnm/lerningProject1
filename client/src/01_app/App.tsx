import { useTheme } from '01_app/providers/ThemeProvider'
import { Navbar } from '03_widgets/Navbar'
import { classNames } from '06_shared/lib/classNames/classNames'
import { AppRouter } from './providers/router/ui/AppRouter'


const App = () => {
  const { theme } = useTheme()

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
