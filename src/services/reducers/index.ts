import { combineReducers } from 'redux'
import { commonReducer } from './commonReducer'
import { ingredientsReducer } from './ingredientsReducer'
import { constructorReducer } from './constructorReducer'
import { registrationReducer } from './registrationReducer'
import { wsReducer } from './wsReducer'


export const rootReducer = combineReducers({
  commonReducer,
  ingredientsReducer,
  constructorReducer,
  registrationReducer,
  wsReducer
})
