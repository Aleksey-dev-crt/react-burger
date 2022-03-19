import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_USER_START,
} from './wsActionTypes'

export const wsConnectionOpen = () => ({ type: WS_CONNECTION_START })

export const wsConnectionAuthOpen = () => ({ type: WS_CONNECTION_USER_START })

export const wsConnectionSuccess = () => ({ type: WS_CONNECTION_SUCCESS })

export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR })

export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED })

export const wsGetMessage = (message) => ({ type: WS_GET_MESSAGE, payload: message })

export const wsSendMessage = (message) => ({ type: WS_SEND_MESSAGE, payload: message })
