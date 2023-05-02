const initialState = {
  showModal: false,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, showModal: true }
    case 'HIDE_MODAL':
      return { ...state, showModal: false }
    default:
      return state
  }
}

export default modalReducer
