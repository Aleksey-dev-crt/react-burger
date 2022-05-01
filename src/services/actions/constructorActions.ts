import {
	ADD_STUFFING,
	ADD_BUN,
	REMOVE_INGREDIENT,
	CLEAR_CONSTRUCTOR,
	CALCULATE_PRICE,
	POST_ORDER,
	POST_ORDER_MODAL,
	MODIFY_STUFFING,
	MODIFY_INGREDIENTS,
} from './actionTypes';
import { getIngredients, placeOrder, TResponseBody } from '../../utils/Api';
import { IIngredient, IOrder } from '../types/types';
import { setLoaderWithoutOverlay, setOrderPending } from './commonActions';

export interface IModifyIngredients {
	readonly type: typeof MODIFY_INGREDIENTS;
	readonly payload: ReadonlyArray<IIngredient>;
}

export interface IAddBun {
	readonly type: typeof ADD_BUN;
	readonly payload: IIngredient;
}

export interface IAddStuffing {
	readonly type: typeof ADD_STUFFING;
	readonly payload: IIngredient;
}

export interface IRemoveIngredient {
	readonly type: typeof REMOVE_INGREDIENT;
	readonly payload: IIngredient;
}

export interface ICalculatePrice {
	readonly type: typeof CALCULATE_PRICE;
}

export interface IPostOrderModal {
	readonly type: typeof POST_ORDER_MODAL;
	readonly payload: boolean;
}

export interface IPostOrderAction {
	readonly type: typeof POST_ORDER;
	readonly payload: TResponseBody<'order', IOrder>;
}

export interface IClearConstructor {
	readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IModifyStuffing {
	readonly type: typeof MODIFY_STUFFING;
	readonly payload: ReadonlyArray<IIngredient>;
}

export type TConstructorActions =
	| IModifyIngredients
	| IAddBun
	| IAddStuffing
	| IRemoveIngredient
	| ICalculatePrice
	| IPostOrderModal
	| IPostOrderAction
	| IClearConstructor
	| IModifyStuffing;

export const modifyIngredients = (
	payload: ReadonlyArray<IIngredient>
): IModifyIngredients => ({
	type: MODIFY_INGREDIENTS,
	payload,
});

export const requestIngredients = () => {
	return (dispatch: any) => {
		dispatch(setLoaderWithoutOverlay(true));
		getIngredients()
			.then((res): void => dispatch(modifyIngredients(res.data)))
			.finally(() => dispatch(setLoaderWithoutOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const addBun = (payload: IIngredient): IAddBun => ({
	type: ADD_BUN,
	payload,
});

export const addStuffing = (payload: IIngredient): IAddStuffing => ({
	type: ADD_STUFFING,
	payload,
});

export const addToConstructor = (payload: IIngredient) => {
	return (dispatch: any) => {
		if (payload.type === 'bun') dispatch(addBun(payload));
		else dispatch(addStuffing(payload));
	};
};

export const removeIngredient = (payload: IIngredient): IRemoveIngredient => ({
	type: REMOVE_INGREDIENT,
	payload,
});

export const calculatePrice = (): ICalculatePrice => ({
	type: CALCULATE_PRICE,
});

export const postOrderModal = (payload: boolean): IPostOrderModal => ({
	type: POST_ORDER_MODAL,
	payload,
});

export const postOrderAction = (
	payload: TResponseBody<'order', IOrder>
): IPostOrderAction => ({ type: POST_ORDER, payload });

export const clearConstructor = (): IClearConstructor => ({
	type: CLEAR_CONSTRUCTOR,
});

export const postOrder = (payload: {
	token: string;
	ingredients: ReadonlyArray<IIngredient>;
}) => {
	return (dispatch: any) => {
		dispatch(setOrderPending(true));
		placeOrder(payload)
			.then((res) => dispatch(postOrderAction(res)))
			.then(() => dispatch(postOrderModal(true)))
			.then(() => dispatch(clearConstructor()))
			.finally(() => dispatch(setOrderPending(false)))
			.catch((err) => console.log(err));
	};
};

export const modifyStuffing = (
	payload: ReadonlyArray<IIngredient>
): IModifyStuffing => ({ type: MODIFY_STUFFING, payload });
