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

  getUserResources(search) {
    var query = "";
    if (search && search != "") {
      query = "?search=" + search;
    }
    return axios.get("/resources/user/resources" + query);
  },

  add(resource) {
    return axios.post("/resources", resource);
  },

  edit(resource) {
    return axios.put("/resources", resource);
  },

  addToCollection(parentId, childId) {
    return axios.post("/resources/collection", {
      parentId: parentId,
      childId: childId
    });
  }
};
