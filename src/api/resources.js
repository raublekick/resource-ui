import config from "./config";
var axios = config();

export default {
  getResources(search) {
    var query = "";
    if (search != "") {
      query = "?search=" + search;
    }
    return axios.get("/resources" + query);
  },

  getResource(id) {
    return axios.get("/resources/" + id);
  },

  getResourceCollection(resourceId) {
    return axios.get("/resources/" + resourceId + "/collection");
  }
};
