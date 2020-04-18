import config from "./config";
var axios = config();

export default {
  register(user) {
    return axios.post("/auth/register", user);
  }
};
