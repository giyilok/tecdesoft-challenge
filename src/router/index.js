import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
//import About from "../views/About.vue";
import ContactView from "../views/ContactView.vue";
import ChartsView from "../views/ChartsView.vue";
import TablesView from "../views/TablesView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/NotFoundView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/charts",
    name: "charts",
    component: ChartsView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tables",
    name: "tables",
    component: TablesView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "*",
    name: "not-found",
    component: NotFoundView,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
