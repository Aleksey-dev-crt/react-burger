import {
	FORGOT_PASSWORD,
	SET_NEW_PASSWORD,
	REGISTER_NEW_USER,
	LOGIN,
	LOGOUT,
	GET_USER_DATA,
	UPDATE_USER_DATA,
	GET_ACCESS_TOKEN,
} from './actionTypes';

import {
	register,
	forgotPassword,
	resetPassword,
	login,
	logout,
	getUserData,
	token,
	updateUserData,
	TResetPassword,
	TRegister,
	TLogin,
	TResponseBody,
} from '../../utils/Api';
import { setCookie } from '../../utils/cookies';
import { ISaveUserData } from '../types/types';
import { setLoaderWithOverlay } from './commonActions';

export interface IForgotPasswordAction {
	readonly type: typeof FORGOT_PASSWORD;
	readonly payload: TResponseBody<"message", string>;
}

export interface ISetNewPassword {
	readonly type: typeof SET_NEW_PASSWORD;
	readonly payload: TResponseBody<"message", string>;
}

export interface IRegisterNewUser {
	readonly type: typeof REGISTER_NEW_USER;
	readonly payload: TResponseBody<"user", {
		email: string;
		name: string;
	}>;
}

export interface IGetAccessToken {
	readonly type: typeof GET_ACCESS_TOKEN;
	readonly payload: string;
}

export interface IGetUserDataAction {
	readonly type: typeof GET_USER_DATA;
	readonly payload: TResponseBody<"user", {
		email: string;
		name: string;
	}>;
}

export interface ILoginAction {
	readonly type: typeof LOGIN;
	readonly payload: TResponseBody<"user", {
		email: string;
		name: string;
	}>;
}

export interface ILogoutAction {
	readonly type: typeof LOGOUT;
	readonly payload: TResponseBody<"message", string>;
}

export interface IUpdateUserDataAction {
	readonly type: typeof UPDATE_USER_DATA;
	readonly payload: TResponseBody<"user", {
		email: string;
		name: string;
	}>;
}

export type TRegistrationActions =
	| IForgotPasswordAction
	| IRegisterNewUser
	| IGetAccessToken
	| IGetUserDataAction
	| ILoginAction
	| ILogoutAction
	| IUpdateUserDataAction
	| ISetNewPassword;

export const forgotPasswordAction = (
	payload: TResponseBody<"message", string>
): IForgotPasswordAction => ({
	type: FORGOT_PASSWORD,
	payload,
});

export const setNewPassword = (payload: TResponseBody<"message", string>): ISetNewPassword => ({
	type: SET_NEW_PASSWORD,
	payload,
});

export const registerNewUser = (payload: TResponseBody<"user", {
    email: string;
    name: string;
}>): IRegisterNewUser => ({
	type: REGISTER_NEW_USER,
	payload,
});

export const getAccessToken = (payload: string): IGetAccessToken => ({
	type: GET_ACCESS_TOKEN,
	payload,
});

export const getUserDataAction = (payload: TResponseBody<"user", {
    email: string;
    name: string;
}>): IGetUserDataAction => ({
	type: GET_USER_DATA,
	payload,
});

export const loginAction = (payload: TResponseBody<"user", {
    email: string;
    name: string;
}>): ILoginAction => ({
	type: LOGIN,
	payload,
});

export const logoutAction = (payload: TResponseBody<"message", string>): ILogoutAction => ({
	type: LOGOUT,
	payload,
});

export const updateUserDataAction = (payload: TResponseBody<"user", {
    email: string;
    name: string;
}>): IUpdateUserDataAction => ({
	type: UPDATE_USER_DATA,
	payload,
});

export const passwordChangeRequest: any = (payload: string) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		forgotPassword(payload)
			.then((res) => dispatch(forgotPasswordAction(res)))
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const changePassword: any = (payload: TResetPassword) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		resetPassword(payload)
			.then((res) => dispatch(setNewPassword(res)))
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const newUser: any = (payload: TRegister) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		register(payload)
			.then((res) => dispatch(registerNewUser(res)))
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const authorization: any = (payload: TLogin) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		login(payload)
			.then((res) => {
				setCookie('refreshToken', res.refreshToken);
				dispatch(getAccessToken(res.accessToken));
				dispatch(loginAction(res));
			})
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const exit: any = (payload: string) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		logout(payload)
			.then((res) => dispatch(logoutAction(res)))
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const requestUserData: any = (payload: string) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		token(payload)
			.then((res) => {
				setCookie('refreshToken', res.refreshToken, {
					path: '/',
					expires: 1200,
				});
				setCookie('refreshToken', res.refreshToken, {
					path: '/profile',
					expires: 1200,
				});
				setCookie('refreshToken', res.refreshToken, {
					path: '/feed',
					expires: 1200,
				});
				dispatch(getAccessToken(res.accessToken));
				getUserData(res.accessToken)
					.then((res) => dispatch(getUserDataAction(res)))
					.catch((err) => console.log(err));
			})
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};

export const saveUserData: any = (payload: ISaveUserData) => {
	return (dispatch: any) => {
		dispatch(setLoaderWithOverlay(true));
		token(payload.refreshToken)
			.then((res) => {
				setCookie('refreshToken', res.refreshToken);
				dispatch(getAccessToken(res.accessToken));
				updateUserData({
					token: res.accessToken,
					email: payload.login,
					name: payload.name,
					password: payload.password,
				})
					.then((res) => dispatch(updateUserDataAction(res)))
					.catch((err) => console.log(err));
			})
			.finally(() => dispatch(setLoaderWithOverlay(false)))
			.catch((err) => console.log(err));
	};
};
