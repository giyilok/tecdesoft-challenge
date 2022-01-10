import axiosInstance from "./api.service.js";

const dataService = {
  async getData() {
    const result = await axiosInstance.get();
    return result.data;
  },
};

export default dataService;
