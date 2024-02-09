import { getLoginInfo, loginActions } from '04_features/AuthByEmail/model/slice/loginSlice'
import { userActions } from '05_entities/User/model/slice/userSlice'
import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch, useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { Input } from '06_shared/ui/Input/Input'
import { TextTheme } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import React, { memo, useCallback, useMemo, useState } from 'react'
import cls from './LoginForm.module.css'


export interface LoginFormProps {
  className?: string
  onSuccess: () => void

}

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess } = props
  const dispatch = useAppDispatch()
  const { email, password } = useAppSelector(getLoginInfo)
  const [isLogin, setIsLogin] = useState<boolean>(true)


  const onChangeEmail = useCallback((value: string) => {
    dispatch(loginActions.setEmail(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(userActions.setIsAuth(true))
    onSuccess()

  }, [dispatch, onSuccess])

  const loginFormParts = useMemo(() => {
    return {
      header: (
        <Text title={isLogin ? 'Login' : 'Registration'} theme={TextTheme.BG_ALL} />
      ),
      footer: (
        <div className={cls.formFooter}>
          <Button type='submit' theme={ButtonTheme.OUTLINE_BACKGROUND}>{isLogin
            ? 'Login'
            : 'Registration'
          }</Button>
          <div className={cls.formFooterText}>
            <Text
              text={isLogin ? 'Have no account?' : 'Already have account?'}
              theme={TextTheme.BG_ALL}
              className={cls.text} />
            <Button
              onClick={() => setIsLogin(prev => !prev)}
              theme={ButtonTheme.CLEAR_BG}>
              {!isLogin ? 'Login' : 'Registration'}
            </Button>
          </div>
        </div>
      )
    }
  }, [isLogin])

  return (
    <form onSubmit={onFormSubmit} className={classNames(cls.LoginForm, [className])}>
      {loginFormParts.header}
      <Input placeholder='Email' value={email} onChange={onChangeEmail} />
      <Input placeholder='Password' value={password} onChange={onChangePassword} type='password' />
      {loginFormParts.footer}
    </form>
  )
})
export default LoginForm