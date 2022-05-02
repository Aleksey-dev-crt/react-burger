import { store } from '../store';
import { TCommonState } from '../reducers/commonReducer';
import { TIngredientsState } from '../reducers/ingredientsReducer';
import { TConstructorState } from '../reducers/constructorReducer';
import { TRegistrationState } from '../reducers/registrationReducer';
import { TwsState } from '../reducers/wsReducer';
import { TCommonActions, TConstructorActions, TIngredientsActions, TRegistrationActions, TwsActions } from '../actions';

export type AppDispatch = typeof store.dispatch;
export type AppActions = TCommonActions | TIngredientsActions | TConstructorActions | TRegistrationActions | TwsActions

export type RootState = {
	commonReducer: TCommonState;
	ingredientsReducer: TIngredientsState;
	constructorReducer: TConstructorState;
	registrationReducer: TRegistrationState;
	wsReducer: TwsState;
};
