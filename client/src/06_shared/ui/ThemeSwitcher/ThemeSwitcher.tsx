import { Theme, useTheme } from '01_app/providers/ThemeProvider'
import { classNames } from '06_shared/lib/classNames/classNames'
import { ToggleSwitch } from '06_shared/ui/ToggleSwitch/ToggleSwitch'
import { memo, useEffect, useLayoutEffect, useState } from 'react'


interface ThemeSwitcherProps {
  className?: string


}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const {
    className
  } = props

  const { theme, toggleTheme } = useTheme()
  const [checked, setChecked] = useState<boolean>(false)

  const isChecked = (theme: Theme) => {
    switch(theme) {
      case Theme.DARK:
        setChecked(true)
        break
      case Theme.LIGHT:
        setChecked(false)
        break
      default:
        setChecked(true)
        break

    }

  }

  useLayoutEffect(() => {
    isChecked(theme)
  }, [theme])

  const onToggleTheme = () => {
    toggleTheme()
    isChecked(theme)
  }


  return (
    <ToggleSwitch
      onToggle={onToggleTheme}
      checked={checked}
      className={classNames('', [className])}
    />
  )
})
