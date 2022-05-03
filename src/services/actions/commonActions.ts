import {
	SET_LOADER_WITH_OVERLAY,
	SET_LOADER_WITHOUT_OVERLAY,
	SET_ORDER_PENDING,
} from './actionTypes';

export interface ISetLoaderWithOverlay {
	readonly type: typeof SET_LOADER_WITH_OVERLAY;
	readonly payload: boolean;
}

export interface ISetLoaderWithoutOverlay {
	readonly type: typeof SET_LOADER_WITHOUT_OVERLAY;
	readonly payload: boolean;
}

export interface ISetOrderPending {
	readonly type: typeof SET_ORDER_PENDING;
	readonly payload: boolean;
}

export type TCommonActions =
	| ISetLoaderWithOverlay
	| ISetLoaderWithoutOverlay
	| ISetOrderPending;

export const setLoaderWithOverlay = (
	payload: boolean
): ISetLoaderWithOverlay => ({ type: SET_LOADER_WITH_OVERLAY, payload });

export const setLoaderWithoutOverlay = (
	payload: boolean
): ISetLoaderWithoutOverlay => ({ type: SET_LOADER_WITHOUT_OVERLAY, payload });

export const setOrderPending = (payload: boolean): ISetOrderPending => ({
	type: SET_ORDER_PENDING,
	payload,
});
