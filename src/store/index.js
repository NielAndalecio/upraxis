import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modalReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
})

export default store
