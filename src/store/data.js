import dataService from "@/services/data.service.js";
import configBuilderService from "@/services/configBuilder.service.js";

const state = {
  data: null,
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
    const mappedDatachart = configBuilderService.configBuilderForChart(
      state.data
    );

    return mappedDatachart;
  },

  getDataForMyExperimentalChart() {
    const mappedDatachart = configBuilderService.getDataForMyExperimentalChart(
      state.data
    );
    return mappedDatachart;
  },

  getDataForTable() {
    const mappedDataTable = configBuilderService.configBuilderForTableSensor(
      state.data
    );
    return mappedDataTable;
  },

  isDataReady() {
    return JSON.parse(JSON.stringify(state.data)) !== null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
