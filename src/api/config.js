import axios from "axios";

function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

export default function setup() {
  var instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI,
    withCredentials: true,
    headers: authHeader()
  });

  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
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

      if (error.response && error.response.status === 403) {
        window.location.href = "/not-authorized";
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
