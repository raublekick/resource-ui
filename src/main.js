import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

Vue.config.errorHandler = function(error) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  Vue.$buefy.toast.open({
    duration: 5000,
    message:
      "Status " +
      (error.response != undefined ? error.response.status : error) +
      "Error",
    type: "is-danger"
  });
};

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY");
  }
});

Vue.filter("formatDateTime", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY h:mm A");
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
