import { TRegistrationActions } from '../actions';
import {
	FORGOT_PASSWORD,
	SET_NEW_PASSWORD,
	REGISTER_NEW_USER,
	LOGIN,
	LOGOUT,
	GET_USER_DATA,
	GET_ACCESS_TOKEN,
	UPDATE_USER_DATA,
} from '../actions/actionTypes';

export type TRegistrationState = {
	resetPassword: {
		message: string;
		success: boolean;
	};
	setNewPassword: {
		message: string;
		success: boolean;
	};
	registeredUser: {
		user: { email: string; name: string };
		success: boolean;
	};
	authorizedUser: {
		user: { email: string; name: string };
		success: boolean;
	};
	userData: {
		user: { email: string; name: string };
		success: boolean;
	};
	token: string;
	authorized: boolean;
};

const initialState = {
	resetPassword: {
		message: '',
		success: false,
	},
	setNewPassword: {
		message: '',
		success: false,
	},
	registeredUser: {
		user: { email: 'string', name: '' },
		success: false,
	},
	authorizedUser: {
		user: { email: 'string', name: '' },
		success: false,
	},
	userData: {
		user: { email: 'string', name: '' },
		success: false,
	},
	token: '',
	authorized: false,
};

export const registrationReducer = (
	state: TRegistrationState = initialState,
	action: TRegistrationActions
) => {
	switch (action.type) {
		case FORGOT_PASSWORD:
			return {
				...state,
				resetPassword: action.payload,
			};
		case SET_NEW_PASSWORD:
			return {
				...state,
				setNewPassword: action.payload,
			};
		case REGISTER_NEW_USER:
			return {
				...state,
				registeredUser: action.payload,
			};
		case LOGIN:
			return {
				...state,
				authorizedUser: action.payload,
				authorized: true,
			};
		case LOGOUT:
			return {
				...state,
				authorized: false,
			};
		case GET_USER_DATA:
			return {
				...state,
				userData: action.payload,
				authorized: true,
			};
		case UPDATE_USER_DATA:
			return {
				...state,
				userData: action.payload,
			};
		case GET_ACCESS_TOKEN:
			return {
				...state,
				token: action.payload,
			};

		default:
			return state;
	}
};
