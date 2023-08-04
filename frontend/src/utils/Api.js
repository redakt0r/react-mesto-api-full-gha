import { apiConfig } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //универсальный метод запроса    (ВЕРОЯТНО ПЕРЕМУДРИЛ, НО ДЛЯ ЛАЙКА НЕ ПРИДУМАЛ СТРУКТУРУ)
  _request(url, method = "GET", options = null, item = "") {
    let fullEndPoint = url + item;
    let body;
    if (options) {
      body = JSON.stringify(options);
    } else body = null;
    return fetch(`${this._baseUrl}${fullEndPoint}`, {
      method: method,
      credentials: "include",
      headers: this._headers,
      body,
    }).then((res) => this._checkResponse(res));
  }

  //проверка ответа
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибочка: ${res.status}`);
    }
    return res.json();
  }

  //получение дефолтных карточек
  getInitialCards() {
    return this._request("/cards");
  }

  //получение данных профиля
  getProfileData() {
    return this._request("/users/me");
  }

  //редактирование данных профиля
  patchProfileData({ name, about }) {
    return this._request("/users/me", "PATCH", { name, about });
  }

  //изменение аватара
  patchAvatar({ avatar }) {
    return this._request("/users/me/avatar", "PATCH", { avatar });
  }

  //дабавление новой карточки
  postNewCard({ name, link }) {
    return this._request("/cards", "POST", { name, link });
  }

  //установка лайка
  putLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //снятие лайка
  deleteLike(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._checkResponse(res));
  }

  //удаление карточки
  deleteCard(item) {
    return this._request("/cards/", "DELETE", null, item._id);
  }
}

export const api = new Api(apiConfig);
