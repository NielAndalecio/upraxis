const initialState = {
  alertIsOpen: false,
  alertType: 'success',
  alertMessage: '',
}

// Define a reducer function to handle user actions
function alertReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        alertIsOpen: action.payload.alertIsOpen,
        alertType: action.payload.alertType,
        alertMessage: action.payload.alertMessage,
      }
    case 'CLOSE_ALERT':
      return initialState
    default:
      return state
  }
}

export default alertReducer
