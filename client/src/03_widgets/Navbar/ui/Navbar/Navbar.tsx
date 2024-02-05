import { NavbarItemsList } from '03_widgets/Navbar/model/items'
import { NavbarItem } from '03_widgets/Navbar/ui/NavbarItem/NavbarItem'
import { LoginModal } from '04_features/AuthByEmail/ui/LoginModal/LoginModal'
import { selectIsAuth, userActions } from '05_entities/User/model/slice/userSlice'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch, useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { Icon } from '06_shared/ui/Icon/Icon'
import { IconTheme } from '06_shared/ui/Icon/model/icon'
import { ThemeSwitcher } from '06_shared/ui/ThemeSwitcher/ThemeSwitcher'
import { ToggleSwitch } from '06_shared/ui/ToggleSwitch/ToggleSwitch'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useCallback, useMemo } from 'react'
import EyeIcon from '../../../../06_shared/assets/icons/eye.svg'
import cls from './Navbar.module.css'


interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const isAuth = useAppSelector(selectIsAuth)
  const [isAuthModal, setIsAuthModal] = useState(false)
  const dispatch = useAppDispatch()

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

  const onLoginHandler = useCallback(() => {
    dispatch(userActions.setIsAuth(true))
  }, [dispatch])
  const onLogoutHandler = useCallback(() => {
    dispatch(userActions.setIsAuth(false))
  }, [dispatch])


  const buttons = useMemo(() => {
    return (isAuth
      ? (
        <div className={cls.btns}>
          <Button
            className={cls.btn}
            theme={ButtonTheme.OUTLINE_BACKGROUND}
            onClick={onLogoutHandler}
          >Logout</Button>
          <Button
            className={cls.btn}
            theme={ButtonTheme.OUTLINE_BACKGROUND}
          >Admin panel</Button>
        </div>
      )
      : (
        <div className={cls.btns}>
          <Button
            className={cls.btn}
            theme={ButtonTheme.OUTLINE_BACKGROUND}
            onClick={onOpenModal}
          >Login</Button>
          
          <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
      )
    )
  }, [isAuth, isAuthModal, onCloseModal, onLogoutHandler, onOpenModal])


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
