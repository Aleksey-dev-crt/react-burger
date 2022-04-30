import {
  SET_LOADER_WITHOUT_OVERLAY,
  SET_CATEGORY,
  ADD_STUFFING,
  ADD_BUN,
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CALCULATE_PRICE,
  POST_ORDER,
  POST_ORDER_MODAL,
  MODIFY_STUFFING,
  MODIFY_INGREDIENTS,
  SET_ORDER_PENDING
} from './actionTypes'
import { getIngredients, placeOrder, TResponseBody } from '../../utils/Api'
import { IIngredient, IOrder } from "../../utils/types"

export interface ISetCategory {
  readonly type: typeof SET_CATEGORY
  readonly payload: string
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT
  readonly payload: IIngredient
}

export interface ICalculatePrice {
  readonly type: typeof CALCULATE_PRICE
}

export interface IPostOrderModal {
  readonly type: typeof POST_ORDER_MODAL
  readonly payload: boolean
}

export interface IModifyStuffing {
  readonly type: typeof MODIFY_STUFFING
  readonly payload: ReadonlyArray<IIngredient>
}

export type TConstructorActions = 
  | ISetCategory
  | IRemoveIngredient
  | ICalculatePrice
  | IPostOrderModal
  | IModifyStuffing

export const requestIngredients = () => {
  return (dispatch: any) => {
    dispatch({ type: SET_LOADER_WITHOUT_OVERLAY, payload: true })
    getIngredients()
      .then((res): void => {
        dispatch({ type: MODIFY_INGREDIENTS, payload: res.data })
      } )
      .finally(() => dispatch({ type: SET_LOADER_WITHOUT_OVERLAY, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const setCategory = (payload: string): ISetCategory  => ({ type: SET_CATEGORY, payload })

export const addToConstructor = (payload: IIngredient) => {
  return (dispatch: any) => {
    if (payload.type === 'bun') dispatch({ type: ADD_BUN, payload })
    else dispatch({ type: ADD_STUFFING, payload })
  }
}

export const removeIngredient = (payload: IIngredient): IRemoveIngredient => ({ type: REMOVE_INGREDIENT, payload })

export const calculatePrice = (): ICalculatePrice => ({ type: CALCULATE_PRICE })

export const postOrderModal = (payload: boolean): IPostOrderModal => ({ type: POST_ORDER_MODAL, payload })

export const postOrder = (payload: {token: string, ingredients: ReadonlyArray<IIngredient>}) => {
  return (dispatch: any) => {
    dispatch({ type: SET_ORDER_PENDING, payload: true })
    placeOrder(payload)
      .then((res): void => {
        dispatch({ type: POST_ORDER, payload: res })
      })
      .then(() => dispatch(postOrderModal(true)))
      .then(() => dispatch({ type: CLEAR_CONSTRUCTOR }))
      .finally(() => dispatch({ type: SET_ORDER_PENDING, payload: false }))
      .catch((err) => console.log(err))
  }
}

export const modifyStuffing = (payload: ReadonlyArray<IIngredient>): IModifyStuffing => ({ type: MODIFY_STUFFING, payload })
