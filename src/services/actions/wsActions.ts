import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_USER_START,
} from './wsActionTypes'

export interface IwsConnectionOpen {
  readonly type: typeof WS_CONNECTION_START
}

export interface IwsConnectionAuthOpen {
  readonly type: typeof WS_CONNECTION_USER_START
}

export interface IwsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IwsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
}

export interface IwsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE
}

export interface IwsGetMessage {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: any
}

export interface IwsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE
  readonly payload: any
}

export type TwsActions = 
  | IwsConnectionOpen
  | IwsConnectionAuthOpen
  | IwsConnectionSuccess
  | IwsConnectionError
  | IwsConnectionClose
  | IwsGetMessage
  | IwsSendMessage

export const wsConnectionOpen = (): IwsConnectionOpen => ({ type: WS_CONNECTION_START })

export const wsConnectionAuthOpen = (): IwsConnectionAuthOpen => ({ type: WS_CONNECTION_USER_START })

export const wsConnectionSuccess = (): IwsConnectionSuccess => ({ type: WS_CONNECTION_SUCCESS })

export const wsConnectionError = (): IwsConnectionError => ({ type: WS_CONNECTION_ERROR })

export const wsConnectionClose = (): IwsConnectionClose => ({ type: WS_CONNECTION_CLOSE })

export const wsGetMessage = (message: any): IwsGetMessage => ({ type: WS_GET_MESSAGE, payload: message })

export const wsSendMessage = (message: any): IwsSendMessage => ({ type: WS_SEND_MESSAGE, payload: message })
