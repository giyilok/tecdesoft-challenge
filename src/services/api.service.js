import axios from "axios";

// Creamos una instancia de axios para obtener datos
const instance = axios.create({
  baseURL: "https://test-api-d93b7-default-rtdb.firebaseio.com/data.json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
