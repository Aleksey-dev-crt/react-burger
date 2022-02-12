import { combineReducers } from 'redux'
import commonReducer from './commonReducer'
import ingredientsReducer from './ingredientsReducer'
import constructorReducer from './constructorReducer'


export const rootReducer = combineReducers({
  commonReducer,
  ingredientsReducer,
  constructorReducer,
})
