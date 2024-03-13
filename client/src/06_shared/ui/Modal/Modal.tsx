import { useTheme } from '01_app/providers/ThemeProvider'
import type { Mods } from '06_shared/lib/classNames/classNames'
import { classNames } from '06_shared/lib/classNames/classNames'
import { Portal } from '06_shared/ui/Portal/Portal'
import type { MutableRefObject, ReactNode } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import cls from './Modal.module.css'


interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    lazy,
    onClose,
    isOpen
  } = props

  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isOpening, setIsOpening] = useState<boolean>(false)
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>
  const { theme } = useTheme()

  useEffect(() => {
    if(isOpen) {
      setIsMounted(true)
      timeRef.current = setTimeout(() => {
        setIsOpening(true)
      }, ANIMATION_DELAY)
    }
    return () => setIsOpening(false)
  }, [isOpen])

  const closeHandler = useCallback(() => {
    if(onClose) {
      setIsClosing(true)
      timeRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
        setIsMounted(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  useEffect(() => {
    if(isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timeRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Mods = {
    [cls.opened]: isOpening,
    [cls.isClosing]: isClosing
  }

  if(lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.modal, [className, theme, 'app_modal'], mods)}>
        <div onClick={closeHandler} className={cls.overlay}>
          <div className={cls.content} onClick={onClickHandler}>{children}</div>
        </div>
      </div>
    </Portal>
  )
}
