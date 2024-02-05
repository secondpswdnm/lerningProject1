import { classNames } from '06_shared/lib/classNames/classNames'
import cls from './AuthPage.module.css'
import { memo } from 'react'


interface AuthPageProps {
  className?: string

}

export const AuthPage = memo((props: AuthPageProps) => {
  const {
    className
  } = props
  return (
    <div className={classNames(cls.AuthPage, [className])}>
    </div>
  )
})
