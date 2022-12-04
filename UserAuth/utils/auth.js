const { default: axios } = require("axios");

const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = "<YOUR-API-KEY>";

async function authenticate(isLogin, email, password) {
  let endPoint = "";
  if (isLogin) {
    endPoint = "signInWithPassword";
  } else {
    endPoint = "signUp";
  }
  const url = `${BASE_URL}${endPoint}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate(false, email, password);
}

export function login(email, password) {
  return authenticate(true, email, password);
}
