import { store } from '../store';
import { TCommonState } from '../reducers/commonReducer';
import { TIngredientsState } from '../reducers/ingredientsReducer';
import { TConstructorState } from '../reducers/constructorReducer';
import { TRegistrationState } from '../reducers/registrationReducer';
import { TwsState } from '../reducers/wsReducer';

export type AppDispatch = typeof store.dispatch;
export type RootState = {
	commonReducer: TCommonState;
	ingredientsReducer: TIngredientsState;
	constructorReducer: TConstructorState;
	registrationReducer: TRegistrationState;
	wsReducer: TwsState;
};
