import config from "./config";
var axios = config();

export default {
  getTags(search) {
    var query = "";
    if (search != "") {
      query = "?search=" + search;
    }
    return axios.get("/tags" + query);
  }
};
