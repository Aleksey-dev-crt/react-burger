const configAPI = {
  baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
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

export const getData = () => {
  return fetch(`${configAPI.baseUrl}`, {
    headers: configAPI.headers,
  }).then(checkResponse)
}


