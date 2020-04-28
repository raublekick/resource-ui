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
  },

  getResourceParents(resourceId) {
    return axios.get("/resources/" + resourceId + "/belongs-to");
  },

  getUserResources() {
    return axios.get("/resources/user/resources");
  },

  add(resource) {
    return axios.post("/resources", resource);
  },

  addToCollection(parentId, childId) {
    return axios.post("/resources/collection", {
      parentId: parentId,
      childId: childId
    });
  }
};
