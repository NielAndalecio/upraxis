import { configureStore } from '@reduxjs/toolkit'
import alertReducer from './reducers/alertReducer'
import modalReducer from './reducers/modalReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    alert: alertReducer,
  },
})

export default store
