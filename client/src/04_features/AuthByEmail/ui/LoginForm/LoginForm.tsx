import { classNames } from '06_shared/lib/classNames/classNames'
import { useAppDispatch, useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import { Button } from '06_shared/ui/Button/Button'
import { ButtonTheme } from '06_shared/ui/Button/model/button'
import { Input } from '06_shared/ui/Input/Input'
import { TextTheme } from '06_shared/ui/Text/model/text'
import { Text } from '06_shared/ui/Text/Text'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { loginByEmail } from '../../model/service/loginByEmail'
import { registerByEmail } from '../../model/service/registerByEmail'
import { authActions, getAuthInfo } from '../../model/slice/authSlice'
import cls from './LoginForm.module.css'


export interface LoginFormProps {
  className?: string
  onSuccess: () => void

}

const LoginForm = memo((props: LoginFormProps) => {
  const { className, onSuccess } = props
  const dispatch = useAppDispatch()
  const { email, password } = useAppSelector(getAuthInfo)
  const [isLogin, setIsLogin] = useState<boolean>(true)


  const onChangeEmail = useCallback((value: string) => {
    dispatch(authActions.setEmail(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(authActions.setPassword(value))
  }, [dispatch])

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch(isLogin) {
      case false:
        dispatch(registerByEmail({ email, password }))
        break
      default :
        dispatch(loginByEmail({ email, password }))
    }
    onSuccess()

  }, [dispatch, email, isLogin, onSuccess, password])

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