export const BASE_URL = 'https://api.juls.diplom.nomoredomainsrocks.ru';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
  .then(checkResponse)
}

export const authorize  = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(checkResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    } 
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}

export const setUserInfo = (name, email, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
        name: name,
        email: email,
    })
  })
  .then(checkResponse);
}

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(checkResponse);
};

export const deleteMovie = (movieId, token) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const saveMovie = (movie, token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      description: movie.description,
      year: movie.year,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then(checkResponse);
};