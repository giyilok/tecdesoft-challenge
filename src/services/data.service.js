import axios from "axios";
import getIdToken from "./token.service";

const DATA_URL =
  "https://test-api-d93b7-default-rtdb.firebaseio.com/data.json?auth=";

const dataService = {
  async getData() {
    const URL = DATA_URL + getIdToken();

    try {
      const result = await axios.get(URL);

      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default dataService;
