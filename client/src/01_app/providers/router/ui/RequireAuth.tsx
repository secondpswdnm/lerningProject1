import { useLocation, Navigate } from 'react-router-dom'
import { RoutePath } from '06_shared/config/routeConfig/routeConfig'
import type { JSX } from 'react'

interface ReqAuthProps {
  children: JSX.Element
  isAuth?: boolean
}

export const RequireAuth = (props: ReqAuthProps) => {
  const { children, isAuth } = props
  const location = useLocation()

  if(!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={RoutePath.shop} state={{ from: location }} replace />
  }

  return children
}