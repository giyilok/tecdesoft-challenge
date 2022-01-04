import dataService from "@/services/data.service.js";
import { configBuilderForChart } from "@/services/configBuilder.service.js";

const state = {
  data: {},
};

const mutations = {
  setData(state, data) {
    state.data = data;
  },
};

const actions = {
  async fetchData({ commit }) {
    const data = await dataService.getData();

    commit("setData", data);
  },
};

const getters = {
  getData() {
    const mappedData = configBuilderForChart(state.data);
    return mappedData;
  },

  isDataReady() {
    console.log("isdataReady", state.data !== {});
    return state.data !== {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
