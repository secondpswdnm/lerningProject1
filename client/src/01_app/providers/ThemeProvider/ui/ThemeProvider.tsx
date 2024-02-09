import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext'
import { useMemo, useState } from 'react'
import type { ReactNode , FC } from 'react'


const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface IThemeProvider {
  children: ReactNode
  initialTheme?: Theme
}

export const ThemeProvider: FC<IThemeProvider> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)


  const defaultProps = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )

}


