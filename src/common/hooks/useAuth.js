import React, { createContext, useContext, useMemo, useState } from 'react'

const authContext = createContext

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)
  const authMemo = useMemo(() => ({ isAuth, update: setIsAuth }), [])

  return (
    <authContext.Provider value={authMemo}>{children}</authContext.Provider>
  )
}

export const useAuthProvider = () => {
  const { isAuth, update } = useContext(authContext)
  return { isAuth, update }
}
