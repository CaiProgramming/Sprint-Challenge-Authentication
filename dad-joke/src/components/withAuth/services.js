const axios = require("axios");
export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : {};

const setUser = user => localStorage.setItem("User", JSON.stringify(user));

export const handleLogin = async ({ username, password }) => {
  let data = await axios
    .post("/api/login", {
      username: username,
      password: password
    })
    .then(res => {
      let token = res.data.token;
      setUser({ token });
      return true;
    })
    .catch(res => {
      alert(res.message);
      return false;
    });
  return data;
};
export const handleRegister = async ({ username, password }) => {
  let data = await axios
    .post("/api/register", {
      username: username,
      password: password
    })
    .then(res => {
      return true;
    })
    .catch(res => {
      alert(res.message);
      return false;
    });
  return data;
};
export const isLoggedIn = () => {
  const user = getUser();
  if (user.token) {
    return true;
  }
  return false;
};

export const logout = callback => {
  setUser({});
};
