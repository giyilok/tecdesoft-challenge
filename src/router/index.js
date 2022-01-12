import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ContactView from "../views/ContactView.vue";
import ChartsView from "../views/ChartsView.vue";
import LoginView from "../views/LoginView.vue";
import ReportView from "../views/ReportView.vue";
import NotFoundView from "../views/NotFoundView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    meta: {
      requiresAuth: true,
    },
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
    path: "/report",
    name: "report",
    component: ReportView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem("x-user")) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
