import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function useModal() {
  return useContext(ModalContext)
}

export function ModalProvider({ children }) {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const modalState = {
    visible,
    showModal,
    hideModal,
  }

  return (
    <ModalContext.Provider value={modalState}>{children}</ModalContext.Provider>
  )
}
