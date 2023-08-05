//настройки для api
const apiConfig = {
  baseUrl: "https://vmesto.otpuska.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

//настройки для авторизации
const authApiConfig = {
  baseUrl: "https://vmesto.otpuska.nomoreparties.co/",
  headers: {
    "Content-Type": "application/json",
  },
};

export { apiConfig, authApiConfig };
