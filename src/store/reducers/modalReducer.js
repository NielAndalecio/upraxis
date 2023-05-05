const initialState = {
  showModal: false,
  showEditModal: false,
  showDeleteModal: false,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, showModal: true }
    case 'HIDE_MODAL':
      return { ...state, showModal: false }
    case 'TOGGLE_MODAL':
      return { ...state, showModal: !state.showModal }
    case 'SHOW_EDIT_MODAL':
      return { ...state, showEditModal: true }
    case 'HIDE_EDIT_MODAL':
      return { ...state, showEditModal: false }
    case 'TOGGLE_EDIT_MODAL':
      return { ...state, showEditModal: !state.showEditModal }
    case 'SHOW_DELETE_MODAL':
      return { ...state, showDeleteModal: true }
    case 'HIDE_DELETE_MODAL':
      return { ...state, showDeleteModal: false }
    case 'TOGGLE_DELETE_MODAL':
      return { ...state, showMshowDeleteModaldal: !state.showDeleteModal }
    default:
      return state
  }
}

export default modalReducer
