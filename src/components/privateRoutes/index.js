import { Outlet } from 'react-router'
import { useAuth } from '../../common/hooks/useAuth'
import redirectTo from './../../utils/redirect'

export const PrivateRoutes = () => {
  const isAuth = useAuth()
  !isAuth ? redirectTo('/login') : redirectTo('/')
  return isAuth && <Outlet />
}
