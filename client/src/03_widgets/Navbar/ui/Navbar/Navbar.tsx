import { NavbarItemsList } from '03_widgets/Navbar/model/items'
import { NavbarItem } from '03_widgets/Navbar/ui/NavbarItem/NavbarItem'
import { logout } from '04_features/AuthByEmail/model/service/logout'
import { LoginModal } from '04_features/AuthByEmail/ui/LoginModal/LoginModal'
import {
  selectIsAdmin,
  selectIsAuth,
  selectUserData,
  userActions
} from '05_entities/User/model/slice/userSlice'
import { RoutePath } from '06_shared/config/routeConfig/routeConfig'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch, useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { CartIcon } from '06_shared/ui/CartIcon/CartIcon'
import { IconTheme } from '06_shared/ui/Icon/model/icon'
import { TextTheme } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import { ThemeSwitcher } from '06_shared/ui/ThemeSwitcher/ThemeSwitcher'
import type { ChangeEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cls from './Navbar.module.css'


interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const isAuth = useAppSelector(selectIsAuth)
  const isAdmin = useAppSelector(selectIsAdmin)
  const userData = useAppSelector(selectUserData)
  const [isAuthModal, setIsAuthModal] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false)
  }, [])
  const onOpenModal = useCallback(() => {
    setIsAuthModal(true)
  }, [])


  const onChangeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(userActions.setIsAuth(e.target.checked))
    },
    [dispatch]
  )

  const itemsList = useMemo(() => (
    NavbarItemsList.map((item) => (
      <NavbarItem item={item} key={item.path} />
    ))
  ), [])

  const onLogoutHandler = useCallback(() => {
    dispatch(logout())
  }, [dispatch])


  const buttons = useMemo(() => {
    return (isAuth
      ? (
        <div className={cls.btns}>
          <Button
            theme={ButtonTheme.OUTLINE_BACKGROUND}
            onClick={onLogoutHandler}
          >Logout
          </Button>
          {isAdmin && <Button
            onClick={() => navigate(RoutePath.admin)}
            theme={ButtonTheme.OUTLINE_BACKGROUND}
          >
              Admin panel
          </Button>}
          <Button theme={ButtonTheme.CLEAR} onClick={() => navigate(RoutePath.basket)}>
            <CartIcon theme={IconTheme.BACKGROUND} />
          </Button>
          {userData?.email && <Text text={userData?.email} theme={TextTheme.BG_ALL} />}
        </div>
      )
      : (
        <div className={cls.btns}>
          <Button
            theme={ButtonTheme.OUTLINE_BACKGROUND}
            onClick={onOpenModal}
          >Login
          </Button>


          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
      )
    )
  }, [isAdmin, isAuth, isAuthModal, navigate, onCloseModal, onLogoutHandler, onOpenModal, userData?.email])


  return (
    <nav className={classNames(cls.Navbar, [className])}>
      <div className={cls.items}>
        {itemsList}
      </div>
      <ThemeSwitcher className={cls.switcher} />
      {buttons}
    </nav>
  )

}
