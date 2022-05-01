import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import { socketMiddleware } from '../utils/socketMiddleware'
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_USER_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './actions/actionTypes'
import thunk from 'redux-thunk'

const wsUrl = "wss://norma.nomoreparties.space/orders"

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitUser: WS_CONNECTION_USER_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  close: WS_CONNECTION_CLOSE,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)))

export const store = createStore(rootReducer, enhancers)