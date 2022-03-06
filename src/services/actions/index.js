import {
  SET_LOADER_WITHOUT_OVERLAY,
  SET_LOADER_WITH_OVERLAY,
  SET_CATEGORY,
  GET_INGREDIENT_DETAILS,
  ADD_STUFFING,
  ADD_BUN,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CALCULATE_PRICE,
  POST_ORDER,
  POST_ORDER_MODAL,
  MODIFY_STUFFING,
  MODIFY_INGREDIENTS,
  FORGOT_PASSWORD,
  SET_NEW_PASSWORD,
  REGISTER_NEW_USER
} from './actionTypes'
import {
  getIngredients,
  placeOrder,
  register,
  forgotPassword,
  resetPassword,
} from '../../utils/Api'

export const requestIngredients = () => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITHOUT_OVERLAY, payload: true })
    getIngredients()
      .then((res) => dispatch({ type: MODIFY_INGREDIENTS, payload: res.data }))
      .finally(() => dispatch({ type: SET_LOADER_WITHOUT_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const setCategory = (payload) => ({ type: SET_CATEGORY, payload })

export const getIngredientDetails = (payload) => ({ type: GET_INGREDIENT_DETAILS, payload })

export const addToConstructor = (payload) => {
  return (dispatch) => {
    if (payload.type === 'bun') dispatch({ type: ADD_BUN, payload })
    else dispatch({ type: ADD_STUFFING, payload })
  }
}

export const removeIngredient = (payload) => ({ type: REMOVE_INGREDIENT, payload })

export const calculatePrice = () => ({ type: CALCULATE_PRICE })

export const postOrderModal = (payload) => ({ type: POST_ORDER_MODAL, payload })

export const postOrder = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: true })
    placeOrder(payload)
      .then((res) => dispatch({ type: POST_ORDER, payload: res }))
      .then(() => dispatch(postOrderModal(true)))
      .then(() => dispatch({ type: CLEAR_CONSTRUCTOR }))
      .finally(() => dispatch({ type: SET_LOADER_WITH_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const modifyStuffing = (payload) => ({ type: MODIFY_STUFFING, payload })

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
