import { AdminPage } from '02_pages/AdminPage/ui/AdminPage'
import { AuthPage } from '02_pages/AuthPage/ui/AuthPage'
import { BasketPage } from '02_pages/BasketPage/ui/BasketPage'
import { DevicePage } from '02_pages/DevicePage/ui/DevicePage'
import { NotFoundPage } from '02_pages/NotFoundPage/ui/NotFoundPage'
import { ShopPage } from '02_pages/ShopPage/ui/ShopPage'
import type { RouteProps } from 'react-router-dom'

export type AppRouteProps = RouteProps & {
	authOnly?: boolean
}
 
export enum AppRoutes {
	ADMIN = 'admin',
	LOGIN = 'login',
	REGISTRATION = 'registration',
	DEVICE = 'device',
	SHOP = 'shop',
	BASKET = 'basket',

	//last
	NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.SHOP]: '/',
  [AppRoutes.ADMIN]: '/admin',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTRATION]: '/registration',
  [AppRoutes.DEVICE]: '/device/', //+id
  [AppRoutes.BASKET]: '/basket',

  //last
  [AppRoutes.NOT_FOUND]: '*'
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.SHOP]: {
    path: RoutePath.shop,
    element: <ShopPage />
  },
  [AppRoutes.ADMIN]: {
    path: RoutePath.admin,
    element: <AdminPage />,
    authOnly: true
  },
  [AppRoutes.DEVICE]: {
    path: `${RoutePath.device}:id`,
    element: <DevicePage />
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    element: <AuthPage />
  },
  [AppRoutes.REGISTRATION]: {
    path: RoutePath.registration,
    element: <AuthPage />
  },
  [AppRoutes.BASKET]: {
    path: RoutePath.basket,
    element: <BasketPage />,
    authOnly: true
  },

  //last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  }
}
