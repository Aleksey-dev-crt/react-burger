import { MiddlewareAPI } from 'redux';
import { TwsActions } from '../services/store';
import { AppDispatch, RootState } from '../services/types';

export const socketMiddleware = (wsUrl: string, wsActions: TwsActions): any => {
	type TAction = {
		type: string;
		payload: any;
	};

	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next: (arg: TAction) => void) => (action: TAction) => {
			const { dispatch, getState } = store;
			const { type, payload } = action;
			const {
				wsInit,
				wsInitUser,
				wsSendMessage,
				onOpen,
				onClose,
				close,
				onError,
				onMessage,
			} = wsActions;
			const { token } = getState().registrationReducer;

			if (type === wsInit) {
				socket = new WebSocket(`${wsUrl}/all`);
			}

			if (type === wsInitUser && token) {
				socket = new WebSocket(`${wsUrl}?token=${token.split(' ')[1]}`);
			}

			if (socket) {
				socket.onopen = (event: Event): void => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = (event: Event): void => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event: MessageEvent): void => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = (event: CloseEvent): void => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === close) {
					socket.close();
				}

				if (type === wsSendMessage) {
					const message = { ...payload, token: token };
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	};
};
