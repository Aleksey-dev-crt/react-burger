import { store } from '../store';
import { TCommonState } from '../reducers/commonReducer';
import { TIngredientsState } from '../reducers/ingredientsReducer';
import { TConstructorState } from '../reducers/constructorReducer';
import { TRegistrationState } from '../reducers/registrationReducer';
import { TwsState } from '../reducers/wsReducer';

export type AppDispatch = typeof store.dispatch;
export type RootState = {
	common: TCommonState;
	ingredients: TIngredientsState;
	constructor: TConstructorState;
	registration: TRegistrationState;
	webSockets: TwsState;
};
