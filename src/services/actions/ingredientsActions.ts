import { SET_CATEGORY } from './actionTypes';

export interface ISetCategory {
	readonly type: typeof SET_CATEGORY;
	readonly payload: string;
}

export type TIngredientsActions = ISetCategory;

export const setCategory = (payload: string): ISetCategory => ({
	type: SET_CATEGORY,
	payload,
});
