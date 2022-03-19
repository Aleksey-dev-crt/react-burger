import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/wsActionTypes'

const initialState = {
  wsConnected: false,
  messages: {},
}

export default function wsReducer(state = initialState, action) {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      }
    case WS_GET_MESSAGE:
      return {
        ...state,      
        messages: action.payload
      }
    
    default:
      return state
  }
}
