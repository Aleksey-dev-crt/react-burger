import {
  SET_LOADER_WITH_OVERLAY,
  FORGOT_PASSWORD,
  SET_NEW_PASSWORD,
  REGISTER_NEW_USER,
  LOGIN,
  LOGOUT,
  GET_USER_DATA,
  UPDATE_USER_DATA,
} from './actionTypes'
 
import {  WS_CONNECTION_START } from './wsActionTypes'
import {
  register,
  forgotPassword,
  resetPassword,
  login,
  logout,
  getUserData,
  token,
  updateUserData
} from '../../utils/Api'
import { setCookie } from '../../utils/cookies'

export const passwordChangeRequest = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    forgotPassword(payload)
      .then((res) => dispatch({ type: FORGOT_PASSWORD, payload: res }))
      .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const changePassword = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    resetPassword(payload)
      .then((res) => dispatch({ type: SET_NEW_PASSWORD, payload: res }))
      .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const newUser = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    register(payload)
      .then((res) => dispatch({ type: REGISTER_NEW_USER, payload: res }))
      .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const authorization = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    login(payload)
      .then((res) => {
        setCookie('refreshToken', res.refreshToken)
        dispatch({ type: LOGIN, payload: res })
    })
      .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const exit = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    logout(payload)
      .then((res) => dispatch({ type: LOGOUT, payload: res }))
      .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const requestUserData = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    token(payload)
    .then((res) => {
      setCookie('refreshToken', res.refreshToken)
      getUserData(res.accessToken)
      .then((res) => dispatch({ type: GET_USER_DATA, payload: res }))
      .catch((err) => console.log(err))
    })
    .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
    .catch((err) => console.log(err))   
  }
}

export const saveUserData = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    token(payload.refreshToken)
    .then((res) => {
      setCookie('refreshToken', res.refreshToken)
      updateUserData({token: res.accessToken, email: payload.login, name: payload.name, password: payload.password})
      .then((res) => dispatch({ type: UPDATE_USER_DATA, payload: res }))
      .catch((err) => console.log(err))
    })
    .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
    .catch((err) => console.log(err))   
  }
}
