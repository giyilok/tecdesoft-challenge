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

  getDataForMyExperimentalChartLine() {
    const mappedDatachart = configBuilderService.getDataForMyExperimentalChart(
      state.data
    );
    return mappedDatachart;
  },

  getDataForMyExperimentalChartBar() {
    const mappedDatachart = configBuilderService.getDataForMyExperimentalChart(
      state.data,
      "bar"
    );
    return mappedDatachart;
  },

  getDataForTable() {
    const mappedDataTable = configBuilderService.configBuilderForTableSensor(
      state.data
    );
    return JSON.parse(JSON.stringify(mappedDataTable));
  },

  getDataForTableDates() {
    const mappedDataTable = configBuilderService.configBuilderForTableDates(
      state.data
    );
    return JSON.parse(JSON.stringify(mappedDataTable));
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
