import { classNames } from '06_shared/lib/classNames/classNames'
import { ToggleSwitchSize } from '06_shared/ui/ToggleSwitch/model/types/toggleSwitch'
import { ToggleSwitchTheme } from '06_shared/ui/ToggleSwitch/model/types/toggleSwitch'
import cls from './ToggleSwitch.module.css'
import React, { memo } from 'react'


interface ToggleSwitchProps {
  className?: string
  onToggle?: () => void
  checked?:boolean
  theme?: ToggleSwitchTheme
  size?: ToggleSwitchSize

}

export const ToggleSwitch = memo((props: ToggleSwitchProps) => {
  const {
    className,
    onToggle,
    checked=false,
    size = ToggleSwitchSize.S,
    theme = ToggleSwitchTheme.PRIMARY
  } = props



  return (
    <div className={classNames(cls.toggle, [className, cls[theme], cls[size]])}>
      <input checked={checked} onChange={onToggle} type='checkbox' id='toggle' /><label htmlFor='toggle' />
    </div>
  )
})
