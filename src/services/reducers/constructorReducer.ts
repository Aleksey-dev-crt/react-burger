import { IIngredient, IOrder } from '../types/types';
import { TConstructorActions } from '../actions';
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
} from '../actions/actionTypes';

export type TConstructorState = {
	stuffing: ReadonlyArray<IIngredient>;
	bun: IIngredient;
	modifyedIngredients: ReadonlyArray<IIngredient>;
	constructorIngredients: ReadonlyArray<IIngredient>;
	price: number;
	isModalOpen: boolean;
	orderDetails: {
		name: string
		order: IOrder
		success: boolean
	};
};

const initialState: TConstructorState = {
	stuffing: [],
	bun: {
		calories: 0,
		carbohydrates: 0,
		constructorID: '',
		count: 0,
		fat: 0,
		image: '',
		image_large: '',
		image_mobile: '',
		name: '',
		price: 0,
		proteins: 0,
		type: '',
		__v: 0,
		_id: '',
		orderCount: 0,
	},
	modifyedIngredients: [],
	constructorIngredients: [],
	price: 0,
	isModalOpen: false,
	orderDetails: {
		name: '',
		order: {
			createdAt: '',
			ingredients: [],
			name: '',
			number: 0,
			status: '',
			updatedAt: '',
			_id: '',
		},
		success: false,
	},
};

export const constructorReducer = (
	state: TConstructorState = initialState,
	action: TConstructorActions
) => {
	switch (action.type) {
		case MODIFY_INGREDIENTS:
			return {
				...state,
				modifyedIngredients: action.payload.map(
					(el) => (el = { ...el, count: 0, constructorID: '' })
				),
			};
		case MODIFY_STUFFING:
			return {
				...state,
				stuffing: action.payload,
			};
		case ADD_STUFFING:
			return {
				...state,
				stuffing: state.bun.count
					? [
							...state.stuffing,
							{
								...action.payload,
								count:
									state.stuffing.filter((el) => el._id === action.payload._id)
										.length + 1,
								constructorID: action.payload._id + action.payload.count++,
							},
					  ]
					: state.stuffing,
				modifyedIngredients: state.bun.count
					? [...state.modifyedIngredients].map((el) =>
							el._id === action.payload._id
								? {
										...action.payload,
										count:
											state.stuffing.filter(
												(el) => el._id === action.payload._id
											).length + 1,
										constructorID: action.payload._id + action.payload.count++,
								  }
								: el
					  )
					: state.modifyedIngredients,
				constructorIngredients: [
					state.bun,
					...state.stuffing,
					action.payload,
					state.bun,
				],
			};
		case ADD_BUN:
			return {
				...state,
				bun: {
					...action.payload,
					count: 2,
					constructorID: action.payload._id + 1,
				},
				modifyedIngredients: [...state.modifyedIngredients]
					.map((el) =>
						el.type === 'bun' ? { ...el, count: 0, constructorID: '' } : el
					)
					.map((el) =>
						el._id === action.payload._id
							? {
									...action.payload,
									count: 2,
									constructorID: action.payload._id + 1,
							  }
							: el
					),
				constructorIngredients: [
					action.payload,
					...state.stuffing,
					action.payload,
				],
			};
		case CLEAR_CONSTRUCTOR:
			return {
				...state,
				constructorIngredients: [],
				bun: {},
				stuffing: [],
				price: 0,
				modifyedIngredients: state.modifyedIngredients.map(
					(el) => (el = { ...el, count: 0, constructorID: '' })
				),
			};
		case REMOVE_INGREDIENT:
			return {
				...state,
				stuffing: [
					...state.stuffing.filter(
						(el) => el.constructorID !== action.payload.constructorID
					),
				],
				modifyedIngredients: [...state.modifyedIngredients].map((el) =>
					el._id === action.payload._id ? { ...el, count: el.count - 1 } : el
				),
			};
		case CALCULATE_PRICE:
			return {
				...state,
				price: state.bun.price
					? state.bun.price * 2 +
					  state.stuffing.reduce((acc, el) => (acc += el.price), 0)
					: state.price,
			};
		case POST_ORDER_MODAL:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case POST_ORDER:
			return {
				...state,
				orderDetails: { ...action.payload },
			};

		default:
			return state;
	}
};
