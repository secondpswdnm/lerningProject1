import { ThemeProvider } from '@emotion/react'
import type { PropsWithChildren } from 'react'
import { theme } from './theme'

interface ProviderThemeProps extends PropsWithChildren {}

export const ProviderTheme = (props: ProviderThemeProps) => {
  const {
    children
  } = props
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
