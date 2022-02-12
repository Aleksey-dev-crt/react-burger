import { SET_CATEGORY, GET_INGREDIENT_DETAILS } from '../actions/actionTypes'

const initialState = {
  category: 'bun',
  ingredientsDetails: { Калории: 0, Белки: 0, Жиры: 0, Углеводы: 0 },
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
        ingredientsDetails: {
          Калории: action.payload.calories,
          Белки: action.payload.proteins,
          Жиры: action.payload.fat,
          Углеводы: action.payload.carbohydrates,
        },
      }
    default:
      return state
  }
}
