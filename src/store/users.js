import authService from "@/services/auth.service.js";

const user = JSON.parse(localStorage.getItem("x-user"));

const initalState = user
  ? { loggedIn: true, user }
  : { loggedIn: false, user: null };

const state = initalState;

const mutations = {
  setLoginOk(state, user) {
    state.loggedIn = true;
    state.user = user;
  },

  setLoginFailure(state) {
    state.loggedIn = false;
    state.user = null;
  },

  setLogout(state) {
    state.loggedIn = false;
    state.user = null;
  },
  refreshToken(state, idToken) {
    state.loggedIn = true;
    state.user.idToken = idToken;
  },
};

const actions = {
  async login({ commit }, userData) {
    try {
      const user = await authService.login(userData);

      commit("setLoginOk", user);
    } catch (error) {
      commit("setLoginFailure");

      throw error;
    }
  },

  doLogout({ commit }) {
    authService.logout();
    commit("setLogout");
  },

  refreshToken({ commit }, idToken) {
    commit("refreshToken", idToken);
  },

  /* async refreshIdToken({ commit }) {
      const userCredentials = await api.refreshIdToken();
      commit("setUser", userCredentials);
    }, */

  /* updateUser({ commit }, user) {
    commit("setUser", user);
  }, */
};

const getters = {
  isAuthenticated() {
    return state.loggedIn;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
