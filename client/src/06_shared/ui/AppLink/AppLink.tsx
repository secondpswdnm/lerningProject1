import { classNames } from '06_shared/lib/classNames/classNames'
import { AppLinkTheme } from '06_shared/ui/AppLink/model/linkProps'
import type { ReactNode } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import cls from './AppLink.module.css'


interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    to
  } = props
  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, [className, cls[theme]])}
    >
      {children}
    </Link>
  )
})
