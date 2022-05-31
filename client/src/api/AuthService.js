import call_api from "./Request";

const login = (username, password) => {
  return call_api({
    method: "POST",
    url: "auth/login",
    data: {
      username,
      password
    }
  })
}

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.replace("/");
}

const getUserFormLocalStorage = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
}

const AuthService = {
  login,
  logout,
  getUserFormLocalStorage
}

export default AuthService;