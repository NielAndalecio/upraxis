const initialUserState = {
  name: '',
  role: '',
  idNumber: '',
  isLogin: false,
  selectedMember: {},
}

// Define a reducer function to handle user actions
function userReducer(state = initialUserState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        name: action.payload.name,
        role: action.payload.role,
        idNumber: action.payload.idNumber,
        isLogin: true,
      }
    case 'USER_LOGOUT':
      return initialUserState
    case 'SELECT_MEMBER':
      return {
        ...state,
        selectedMember: action.payload,
      }
    case 'CLEAR_MEMBER':
      return {
        ...state,
        selectedMember: {},
      }
    default:
      return state
  }
}

export default userReducer
