import { SET_LOADER_WITHOUT_OVERLAY, SET_LOADER_WITH_OVERLAY } from '../actions/actionTypes'


const initialState = {
  loadingWithoutOverlay: false,
  loadingWithOverlay: false,
}

export default function commonReducer(state = initialState, action) {
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
    default:
      return state
  }
}