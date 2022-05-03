import { TwsActions } from '../actions'
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/actionTypes'
import { IOrdersInfo } from '../types/types'

export type TwsState = {
  wsConnected: boolean
  messages: IOrdersInfo
}

const initialState = {
  wsConnected: false,
  messages: {
    orders: [],
    total: 0,
    totalToday: 0
  }
}

export const wsReducer = (state: TwsState = initialState, action: TwsActions)  => {
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
