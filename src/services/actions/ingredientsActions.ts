import { SET_CATEGORY } from './actionTypes';

export interface TSetCategory {
	readonly type: typeof SET_CATEGORY;
	readonly payload: string;
}

export type TIngredientsActions = TSetCategory;

export const setCategory = (payload: string): TSetCategory => ({
	type: SET_CATEGORY,
	payload,
});
