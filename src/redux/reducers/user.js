const initialState = {
  username: null,
  password: null,
  avatar: null,
  id: null,
  isAdmin: false,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      if (action.payload) {
        return {
          ...state,
          username: action.payload.username,
          password: action.payload.password,
          avatar: action.payload.avatar,
          id: action.payload.id,
          isAdmin:
            action.payload.username === 'subtitri' &&
            action.payload.password ===
              '5b4e64e9122b548101d5cf76ebd7476ae6583782ab144e35f45c7aa3d5d52d20'
              ? true
              : false,
        }
      } else {
        return null
      }
  }
  return state
}

export default user
