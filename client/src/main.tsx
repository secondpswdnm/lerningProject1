import App from '01_app/App'
import ErrorBoundary from '01_app/providers/ErrorBoundary/ErrorBoundary'
import { ProviderTheme } from '01_app/providers/ThemeProvider'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ErrorBoundary>
      <ProviderTheme>
        <CssBaseline />
        <App />
      </ProviderTheme>
    </ErrorBoundary>
  </BrowserRouter>
)
