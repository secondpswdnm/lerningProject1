import type { NavbarItemType } from '03_widgets/Navbar/model/items'
import { selectIsAuth } from '05_entities/User/model/slice/userSlice'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { AppLink } from '06_shared/ui/AppLink/AppLink'
import { AppLinkTheme } from '06_shared/ui/AppLink/model/linkProps'
import cls from './NavbarItem.module.css'
import { memo } from 'react'


interface NavbarItemProps {
  item: NavbarItemType
}

export const NavbarItem = memo((props: NavbarItemProps) => {
  const {
    item
  } = props
  const { path, text } = item
  const isAuth = useAppSelector(selectIsAuth)

  if(item.authOnly && !isAuth){
    return null
  }

  return (
    <AppLink
      theme={AppLinkTheme.BACKGROUND}
      to={path}
      className={classNames(cls.item)}
    >
      <span className={cls.link} >{text}</span>
    </AppLink>
  )
})
