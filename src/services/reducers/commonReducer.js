import { SET_LOADER_ON_INGREDIENTS, SET_LOADER_ON_POST_ORDER } from '../actions/actionTypes'


const initialState = {
  loadingOnReguestIngredients: false,
  loadingOnPostOrder: false,
}

export default function commonReducer(state = initialState, action) {
  switch (action.type) {    
     case SET_LOADER_ON_INGREDIENTS:
      return {
        ...state,
        loadingOnReguestIngredients: action.payload,
      } 
      case SET_LOADER_ON_POST_ORDER:
      return {
        ...state,
        loadingOnPostOrder: action.payload,
      }        
    default:
      return state
  }
}