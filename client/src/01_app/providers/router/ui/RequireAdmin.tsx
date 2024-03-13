import { selectIsAdmin } from '05_entities/User/model/slice/userSlice'
import { RoutePath } from '06_shared/config/routeConfig/routeConfig'
import { useAppSelector } from '06_shared/lib/hooks/StoreHooks'
import type { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'


interface ReqAdminProps {
  children: JSX.Element
}

export const RequireAdmin = (props: ReqAdminProps) => {
  const { children } = props
  const location = useLocation()
  const isAdmin = useAppSelector(selectIsAdmin)


  if(!isAdmin) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={RoutePath.shop} state={{ from: location }} replace />
  }

  return children
}