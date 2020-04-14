import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ResourceDetails from "../views/Details";
import PageNotFound from "../views/404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/page-not-found",
    name: "404",
    component: PageNotFound
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/:id/:name",
    name: "Details",
    component: ResourceDetails,
    props: true
  },
  {
    path: "*",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
