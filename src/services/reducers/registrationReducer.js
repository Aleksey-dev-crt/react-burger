import { FORGOT_PASSWORD, SET_NEW_PASSWORD, REGISTER_NEW_USER } from '../actions/actionTypes'

const initialState = {
  resetPassword: {},
  setNewPassword: {},
  user: {}
}

export default function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      }
      case SET_NEW_PASSWORD:
        return {
          ...state,
          setNewPassword: action.payload,
        }
        case REGISTER_NEW_USER:
          return {
            ...state,
            user: action.payload,
          }
    
    default:
      return state
  }
}
