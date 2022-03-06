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


