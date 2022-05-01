import { SET_LOADER_WITHOUT_OVERLAY, SET_LOADER_WITH_OVERLAY, SET_ORDER_PENDING } from '../actions/actionTypes'
import { TCommonActions } from '../actions/commonActions'

export type TCommonState = {
  loadingWithoutOverlay: boolean
  loadingWithOverlay: boolean
  orderPending: boolean
}

const initialState = {
  loadingWithoutOverlay: false,
  loadingWithOverlay: false,
  orderPending: false,
}

export const commonReducer = (state: TCommonState = initialState, action: TCommonActions) => {
  switch (action.type) {    
     case SET_LOADER_WITHOUT_OVERLAY:
      return {
        ...state,
        loadingWithoutOverlay: action.payload,
      } 
      case SET_LOADER_WITH_OVERLAY:
      return {
        ...state,
        loadingWithOverlay: action.payload,
      }     
      case SET_ORDER_PENDING:
      return {
        ...state,
        orderPending: action.payload,
      }    

    default:
      return state
  }
}