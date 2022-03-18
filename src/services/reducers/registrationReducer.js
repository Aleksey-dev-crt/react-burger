import { FORGOT_PASSWORD, SET_NEW_PASSWORD, REGISTER_NEW_USER, LOGIN, LOGOUT, GET_USER_DATA, GET_ACCESS_TOKEN, UPDATE_USER_DATA } from '../actions/actionTypes'

const initialState = {
  resetPassword: {},
  setNewPassword: {},
  registeredUser: {},
  authorizedUser: {},
  userData: {},
  token: '',
  authorized: false
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
            registeredUser: action.payload,
          }
          case LOGIN:
          return {
            ...state,
            authorizedUser: action.payload,
            authorized: true
          }
          case LOGOUT:
          return {
            ...state,
            authorized: false
          }         
          case GET_USER_DATA:
            return {
              ...state,
              userData: action.payload,
              authorized: true
            }
            case UPDATE_USER_DATA:
            return {
              ...state,
              userData: action.payload,
            }
             case GET_ACCESS_TOKEN:
            return {
              ...state,
              token: action.payload,
            }
    
    default:
      return state
  }
}
