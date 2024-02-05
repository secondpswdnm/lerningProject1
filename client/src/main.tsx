import App from '01_app/App'
import ErrorBoundary from '01_app/providers/ErrorBoundary/ErrorBoundary'
import { StoreProvider } from '01_app/providers/StoreProvider'
import { ThemeProvider } from '01_app/providers/ThemeProvider'
import '01_app/styles/index.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)
