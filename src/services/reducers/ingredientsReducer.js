import { SET_CATEGORY, GET_INGREDIENT_DETAILS } from '../actions/actionTypes'

const initialState = {
  category: 'bun',
  ingredientsDetails: {},
}

export default function ingredientsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      }
    case GET_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientsDetails: action.payload,
      }
    default:
      return state
  }
}
