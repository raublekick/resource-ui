import axios from "axios";
import store from "../store/index";
import router from "../router";

function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return "Bearer " + user.token;
  } else {
    return {};
  }
}

export default function setup() {
  var instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI,
    withCredentials: true
  });

  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      config.headers.Authorization = authHeader();
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      // Do something with response error
      console.log(error);

      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Logout user if token refresh didn't work or user is disabled
      if (
        error.config.url == "/api/auth/token" ||
        error.response.message == "Account is disabled."
      ) {
        store.commit("logout");
        router.push({ name: "home" });

        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // Try request again with new token
      return store
        .dispatch("auth/refreshToken")
        .then(user => {
          // New request with new token
          const config = error.config;
          config.headers["Authorization"] = `Bearer ${user.token}`;

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        })
        .catch(error => {
          Promise.reject(error);
        });
    }
  );

  return instance;
}
