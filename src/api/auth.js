import config from "./config";
var axios = config();

export default {
  register(user) {
    return axios.post("/auth/register", user);
  },
  login(user) {
    return axios.post("/auth/login", user);
  },
  logout() {
    localStorage.removeItem("user");
  },
  refreshToken(refreshToken) {
    return axios.post("auth/token", { token: refreshToken });
  }
};
