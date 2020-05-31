import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Register from "../views/Register";
import Login from "../views/Login";
import Logout from "../views/Logout";
import ResourceDetails from "../views/Details";
import ResourceAdd from "../views/Add";
import ResourceEdit from "../views/Edit";
import PageNotFound from "../views/404";

import store from "../store";

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
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
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
    path: "/add",
    name: "Add",
    component: ResourceAdd,
    meta: { requireLogin: true }
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: ResourceEdit,
    props: true,
    meta: { requireLogin: true }
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

router.beforeEach((to, from, next) => {
  var requireLogin = to.meta.requireLogin;

  if (!requireLogin) {
    next();
  } else {
    if (store.state.auth.status.loggedIn) {
      next();
    } else {
      next(Error("Not allowed"));
    }
  }
});

export default router;
