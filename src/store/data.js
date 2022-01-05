import dataService from "@/services/data.service.js";
import configBuilderService from "@/services/configBuilder.service.js";

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
    const mappedDataChart = configBuilderService.configBuilderForChart(
      state.data
    );
    return mappedDataChart;
  },

  getDataForTable() {
    const mappedDataTable = configBuilderService.configBuilderForTableSensor(
      state.data
    );
    return mappedDataTable;
  },

  isDataReady() {
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
