const initialState = {
  alertIndexes: 0,
  alerts: [],
}

// Define a reducer function to handle user actions
function alertReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        alertIndexes: state.alertIndexes + 1,
        alerts: [
          ...state.alerts,
          { ...action.payload, index: state.alertIndexes },
        ],
      }
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: [
          ...state.alerts.filter((alert) => alert.index !== action.payload),
        ],
      }
    case 'CLOSE_ALERT':
      return initialState
    default:
      return state
  }
}

export default alertReducer
