import {
  ADD_STUFFING,
  ADD_BUN,
  REMOVE_INGREDIENT,
  CALCULATE_PRICE,
  POST_ORDER,
  POST_ORDER_MODAL,
  MODIFY_STUFFING,
  MODIFY_INGREDIENTS,
} from '../actions/actionTypes'

const initialState = {
  stuffing: [],
  bun: {},
  modifyedIngredients: [],
  constructorIngredients: [],
  price: 0,
  isModalOpen: false,
  orderDetails: {},
}

export default function constructorReducer(state = initialState, action) {
  switch (action.type) {   
    case MODIFY_INGREDIENTS:
      return {
        ...state,
        modifyedIngredients: action.payload.map(
          (el) => (el = { ...el, count: 0, constructorID: '' })
        ),
      }
    case MODIFY_STUFFING:
      return {
        ...state,
        stuffing: action.payload,
      }
    case ADD_STUFFING:
      return {
        ...state,
        stuffing: state.bun.count ? [
          ...state.stuffing,
          {
            ...action.payload,
            count: state.stuffing.filter((el) => el._id === action.payload._id).length + 1,
            constructorID: action.payload._id + action.payload.count++,
          },
        ] : state.stuffing,
        modifyedIngredients: state.bun.count ? [...state.modifyedIngredients].map((el) =>
          el._id === action.payload._id
            ? {
                ...action.payload,
                count: state.stuffing.filter((el) => el._id === action.payload._id).length + 1,
                constructorID: action.payload._id + action.payload.count++,
              }
            : el
        ) : state.modifyedIngredients,
        constructorIngredients: [state.bun, ...state.stuffing, action.payload],
      }
    case ADD_BUN:
      return {
        ...state,
        bun: {
          ...action.payload,
          count: 1,
          constructorID: action.payload._id + 1,
        },
        modifyedIngredients: [...state.modifyedIngredients]
          .map((el) => (el.type === 'bun' ? { ...el, count: 0, constructorID: '' } : el))
          .map((el) =>
            el._id === action.payload._id
              ? {
                  ...action.payload,
                  count: 1,
                  constructorID: action.payload._id + 1,
                }
              : el
          ),
        constructorIngredients: [action.payload, ...state.stuffing],
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        stuffing: [
          ...state.stuffing.filter((el) => el.constructorID !== action.payload.constructorID),
        ],
        modifyedIngredients: [...state.modifyedIngredients].map((el) =>
          el._id === action.payload._id ? { ...el, count: el.count - 1 } : el
        ),
      }
    case CALCULATE_PRICE:
      return {
        ...state,
        price: state.bun.price
          ? state.bun.price * 2 + state.stuffing.reduce((acc, el) => (acc += el.price), 0)
          : state.price,
      }
    case POST_ORDER_MODAL:
      return {
        ...state,
        isModalOpen: action.payload,
      }
    case POST_ORDER:
      return {
        ...state,
        orderDetails: { ...action.payload },
      }

    default:
      return state
  }
}
