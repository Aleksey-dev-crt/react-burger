import { store } from '../store';
import { TCommonState } from '../reducers/commonReducer';
import { TIngredientsState } from '../reducers/ingredientsReducer';
import { TConstructorState } from '../reducers/constructorReducer';
import { TRegistrationState } from '../reducers/registrationReducer';
import { TwsState } from '../reducers/wsReducer';
import {
	TCommonActions,
	TConstructorActions,
	TIngredientsActions,
	TRegistrationActions,
	TwsActions,
} from '../actions';
import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type AppDispatch = typeof store.dispatch;

type AppActions =
	| TCommonActions
	| TIngredientsActions
	| TConstructorActions
	| TRegistrationActions
	| TwsActions;

export type ActionThunk = ActionCreator<
	ThunkAction<void, RootState, unknown, AppActions>
>;

export type DispatchThunk = ThunkDispatch<RootState, void, AppActions>;

export type RootState = ReturnType<typeof store.getState>;
