import { SET_CATEGORY } from '../actions/actionTypes'

const initialState = {
  category: 'bun',
}

export default function ingredientsReducer(state = initialState, action) {
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
