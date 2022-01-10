import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import store from "./store";

import setupInterceptors from "@/services/setupInterceptors.js";
import "./assets/css/main.scss";

Vue.use(Buefy, { defaultIconPack: "fa" });

Vue.config.productionTip = false;
setupInterceptors(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
