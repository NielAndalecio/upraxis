const initialUserState = {
  name: '',
  isLogin: false,
}

// Define a reducer function to handle user actions
function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        name: action.payload.name,
        isLogin: true,
      }
    case 'USER_LOGOUT':
      return initialUserState
    default:
      return state
  }
}

export default userReducer
