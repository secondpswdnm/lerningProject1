import { classNames } from '06_shared/lib/classNames/classNames'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { EyeIcon } from '06_shared/ui/EyeIcon/EyeIcon'
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import React, { memo, useCallback, useMemo, useRef, useState } from 'react'
import cls from './Input.module.css'


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    readonly,
    type = 'text',
    placeholder,
    autoFocus
  } = props
  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  const onBlur = useCallback(() => {
    if(!value) {
      setIsFocused(false)
    }
  }, [value])

  const onFocus = () => {
    setIsFocused(true)
  }

  const onTogglePasswordVisibility = useCallback(() => {
    if(inputType === 'text') {
      setInputType('password')
    }
    if(inputType === 'password') {
      setInputType('text')
    }
  }, [inputType])

  const eyeIcon = useMemo(() => {
    if(type === 'password') {
      return <Button
        onClick={onTogglePasswordVisibility}
        theme={ButtonTheme.EMPTY}
        className={cls.eye}
        square
        stopProp
      >
        <EyeIcon size={20} hide={!(inputType === 'password')} />
      </Button>
    }

  }, [inputType, onTogglePasswordVisibility, type])


  return (
    <div className={classNames(cls.Input, [className])}>
      {placeholder && (
        <span className={classNames(
          cls.placeholder,
          [],
          {
            [cls.focusedPlaceholder]: isFocused
          })}>{placeholder}</span>
      )}
      <input
        ref={ref}
        type={inputType}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames(cls.inp, [], { [cls.focusedInput]: isFocused })}
        disabled={readonly}
      />
      {eyeIcon}
    </div>
  )
})
