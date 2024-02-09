import { classNames } from '06_shared/lib/classNames/classNames'
import { ButtonSize, ButtonTheme } from './model/button'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import React, { memo } from 'react'
import cls from './Button.module.css'


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
  theme?: ButtonTheme
  size?: ButtonSize
  disabled?: boolean
  onClick?: () => void
  square?: boolean
  stopProp?: boolean
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    square,
    onClick,
    disabled = false,
    theme = ButtonTheme.BACKGROUND_INVERTED,
    children,
    size = ButtonSize.M,
    type = 'button',
    stopProp = false,

  } = props

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(stopProp) {
      e.stopPropagation()
    }
    if(onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClickHandler}
      className={classNames(cls.Button,
        [className, cls[theme], cls[size]],
        {
          [cls.square]: square,
          [cls.disabled]: disabled
        }
      )}>
      {children}
    </button>
  )
})
