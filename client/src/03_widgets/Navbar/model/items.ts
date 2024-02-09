import { RoutePath } from '06_shared/config/routeConfig/routeConfig'


export interface NavbarItemType {
  path: string
  text: string
  authOnly?: boolean

}


export const NavbarItemsList: NavbarItemType[] = [
  {
    path: RoutePath.shop,
    text: 'ISHOp'
  },
]