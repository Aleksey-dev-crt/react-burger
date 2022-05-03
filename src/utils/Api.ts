import { IIngredient, IOrder } from "../services/types/types"

const configAPI = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
}

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [key in TDataKey]: TDataType
} & {
  name: string
  success: boolean
  accessToken: string
  refreshToken: string
  message?: string
  headers?: Headers
};

export interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

const checkResponse = (res: Response): Promise<any> => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status + ' - ' + res.statusText}`)
}

export const getIngredients = (): Promise<
TResponseBody<'data', Array<IIngredient>>
> => {
  return fetch(`${configAPI.baseUrl}/ingredients`, {
    headers: configAPI.headers,
  }).then(checkResponse)
}

type TPlaceOrder = {
  token: string
  ingredients: Array<IIngredient>
}

export const placeOrder = ({ token, ingredients }: TPlaceOrder): Promise<
TResponseBody<'order', IOrder>> => {
  return fetch(`${configAPI.baseUrl}/orders`, {
    method: 'POST',
    headers: { authorization: token, ...configAPI.headers },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse)
}

export const forgotPassword = (email: string): Promise<
TResponseBody<'message', string>> => {
  return fetch(`${configAPI.baseUrl}/password-reset`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      email,
    }),
  }).then(checkResponse)
}

export type TResetPassword = {
  password: string
  token: string
}

export const resetPassword = ({ password, token }: TResetPassword): Promise<
TResponseBody<'message', string>> => {
  return fetch(`${configAPI.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      password,
      token,
    }),
  }).then(checkResponse)
}

export type TRegister = {
  email: string
  password: string
  name: string
}

export const register = ({ email, password, name }: TRegister): Promise<
TResponseBody<'user', {email: string, name: string}>> => {
  return fetch(`${configAPI.baseUrl}/auth/register`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(checkResponse)
}

export type TLogin = {
  email: string
  password: string
}

export const login = ({ email, password }: TLogin): Promise<
TResponseBody<'user', {email: string, name: string}>> => {
  return fetch(`${configAPI.baseUrl}/auth/login`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse)
}

export const logout = (refreshToken: string): Promise<
TResponseBody<'message', string>> => {
  return fetch(`${configAPI.baseUrl}/auth/logout`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse)
}

export const token = (refreshToken: string): Promise<
TResponseBody<''>> => {
  return fetch(`${configAPI.baseUrl}/auth/token`, {
    method: 'POST',
    headers: configAPI.headers,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse)
}

export const getUserData = (token: string): Promise<
TResponseBody<'user', {email: string, name: string}>> => {
  return fetch(`${configAPI.baseUrl}/auth/user`, {
    headers: { authorization: token, ...configAPI.headers },
  }).then(checkResponse)
}

type TUpdateUserData = {
  token: string
  email: string
  name: string
  password: string
}

export const updateUserData = ({ token, email, name, password }: TUpdateUserData): Promise<
TResponseBody<'user', {email: string, name: string}>> => {
  return fetch(`${configAPI.baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: { authorization: token, ...configAPI.headers },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  }).then(checkResponse)
}
