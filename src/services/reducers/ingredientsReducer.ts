import { TIngredientsActions } from '../actions'
import { SET_CATEGORY } from '../actions/actionTypes'

export type TIngredientsState = {
  category: string
}

const initialState = {
  category: 'bun',
}

export const ingredientsReducer = (state: TIngredientsState = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
  
    default:
      return state
  }
}
