const UserReducer = (
  state = JSON.parse(localStorage.getItem('User_docto') || '[]'),
  action,
) => {
 
  switch (action.type) {
    case 'SET_USER':
      localStorage.setItem('User_docto', JSON.stringify(action.payload))
      return action.payload

    case 'REMOVE_USER':
      localStorage.removeItem('User_docto')
      return null

    default:
      return state
  }
}

export default UserReducer