import Vue from "vue";
import Vuex from "vuex";
import users from "@/store/users.js";
import data from "@/store/data.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    data,
  },
});
