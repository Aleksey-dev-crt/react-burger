const configAPI = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status + ' - ' + res.statusText}`)
}

export const getIngredients = () => {
  return fetch(`${configAPI.baseUrl}/ingredients`, {
    headers: configAPI.headers,
  }).then(checkResponse)
}

export const placeOrder = (ingredients) => {
  return fetch(`${configAPI.baseUrl}/orders`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      ingredients
    })
  }).then(checkResponse);
}

export const forgotPassword = (email) => {
  return fetch(`${configAPI.baseUrl}/password-reset`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      email
    })
  }).then(checkResponse);
}

export const resetPassword = ({password, token}) => {
  return fetch(`${configAPI.baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      password,
      token
    })    
  }).then(checkResponse);
}

export const register = ({email, password, name}) => {
  return fetch(`${configAPI.baseUrl}/auth/register`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      email,
      password,
      name
    })
  }).then(checkResponse);
}

export const login = ({email, password}) => {
  return fetch(`${configAPI.baseUrl}/auth/login`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      email,
      password,
    })
  }).then(checkResponse);
}

export const logout = (refreshToken) => {
  return fetch(`${configAPI.baseUrl}/auth/logout`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      token : refreshToken,
    })
  }).then(checkResponse);
}

export const token = (refreshToken) => {
  return fetch(`${configAPI.baseUrl}/auth/token`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      token : refreshToken,
    })
  }).then(checkResponse);
}

export const getUserData = (token) => {
  return fetch(`${configAPI.baseUrl}/auth/user`, {
    headers: {authorization: token, ...configAPI.headers},    
  }).then(checkResponse);
}

export const updateUserData = ({token, email, name, password}) => {
  return fetch(`${configAPI.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      authorization : token,
      email,
      name,
      password
    })
  }).then(checkResponse);
}




