import { useSelector } from 'react-redux'

export const useAuth = () => {
  const stateLogin = useSelector((state) => state.user)
  console.log({ stateLogin })
  const isLogin = localStorage.getItem('isLogin') ?? stateLogin.isLogin
  if (isLogin) {
    localStorage.setItem('isLogin', true)
  } else {
    localStorage.removeItem('isLogin')
  }
  return isLogin
}
