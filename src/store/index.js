import { configureStore } from '@reduxjs/toolkit'
import modalReducer from './reducers/modalReducer'

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
})

export default store
