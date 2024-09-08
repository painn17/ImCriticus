import axios from "axios";

export async function registerWithEmailPassword(data) {
  try {
    const response = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username: data.username,
        email: data.email,
        password: data.password,
      }
    );
    const token = response.data.jwt;
    localStorage.setItem("JWTtoken", token);

    // Получаем дополнительные данные о пользователе
    const userDataResponse = await axios.get(
      "http://localhost:1337/api/users/me?populate=animeWatched,wantToWatch,suggestions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("isLoggedEver", true);
    return { jwt: token, user: userDataResponse.data }; // Возвращаем jwt и данные пользователя
  } catch (error) {
    console.log("An error occurred:", error.response);
    return { error: error.response }; // Возвращаем объект ошибки
  }
}

export async function loginWithEmailPassword(data) {
  try {
    const response = await axios.post("http://localhost:1337/api/auth/local", {
      identifier: data.email,
      password: data.password,
    });
    const token = response.data.jwt;
    localStorage.setItem("JWTtoken", token);

    // Получаем дополнительные данные о пользователе
    const userDataResponse = await axios.get(
      "http://localhost:1337/api/users/me?populate=animeWatched,wantToWatch,suggestions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("isLoggedEver", true);
    return { jwt: token, user: userDataResponse.data }; // Возвращаем jwt и данные пользователя
  } catch (error) {
    console.log("An error occurred:", error.response);
    return { error: error.response }; // Возвращаем объект ошибки
  }
}
