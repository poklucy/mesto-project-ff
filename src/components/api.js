const config = {
  cohortId: 'wff-cohort-25',
  baseUrl: 'https://nomoreparties.co/v1/',
  headers: {
    authorization: 'b8e84510-5be3-444b-a763-a602b4062506',
    'Content-Type': 'application/json'
  }
};

const url = `${config.baseUrl}${config.cohortId}`;

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Ошибка: ${response.status}`);
  }
};

export const getInitialCards = () => {
  return fetch(`${url}/cards`, {
    headers: config.headers
  }).then(handleResponse);
};

export const getProfileInfo = () => {
  return fetch(`${url}/users/me`, {
    headers: config.headers
  }).then(handleResponse);
};

export const updateProfileInfo = (name, about) => {
  return fetch(`${url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(handleResponse);
};

export const addNewCard = (name, link) => {
  return fetch(`${url}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(handleResponse);
};

export const addLike = (cardId) => {
  return fetch(`${url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  }).then(handleResponse);
};

export const removeLike = (cardId) => {
  return fetch(`${url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
};

export const deleteCardApi = (cardId) => {
  return fetch(`${url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
};

export const updateAvatar = async (newAvatarUrl) => {
  try {
    const response = await fetch(`${url}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: newAvatarUrl })
    });

    const result = await handleResponse(response);
    console.log('Аватар успешно обновлён!', result);

   
    document.querySelector('.profile__image').style.backgroundImage = `url('${newAvatarUrl}')`;
  } catch (error) {
    console.error('Ошибка при обновлении аватара:', error);
  }
};
