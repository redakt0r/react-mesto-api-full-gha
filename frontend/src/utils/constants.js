//настройки для api
const apiConfig = {
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
};

//настройки для авторизации
const authApiConfig = {
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
};

export { apiConfig, authApiConfig };
