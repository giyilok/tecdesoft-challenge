import axios from "axios";
import User from "@/models/user.model.js";

const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_APIKEY}`;

const authService = {
  async login({ email, password }) {
    try {
      const result = await axios.post(AUTH_URL, {
        email,
        password,
        returnSecureToken: true,
      });
      const user = new User(result.data);

      localStorage.setItem("x-user", JSON.stringify(user));

      return user;
    } catch (error) {
      const message =
        error.response?.status == 400
          ? "El email o la contraseña son incorrectos. Vuelve a intentarlo."
          : error.message;

      throw new Error(message);
    }
  },

  logout() {
    localStorage.removeItem("x-user");
  },
};

export default authService;
