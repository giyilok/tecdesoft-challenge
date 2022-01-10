import axiosInstance from "./api.service.js";
//import axios from "axios";
import TokenService from "./token.service.js";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getIdToken();
      if (token) {
        config.params = {
          auth: token,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalConfig = error.config;

      if (
        originalConfig.url !==
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBr1ehjxkXlICK-Zu0Wu_zUg8H68aQAp5k" &&
        error.response
      ) {
        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          const params = new URLSearchParams();
          params.append("grant_type", "refresh_token");
          params.append("refresh_token", `${TokenService.getRefreshToken()}`);

          try {
            const result = await axiosInstance.post(
              "https://securetoken.googleapis.com/v1/token?key=AIzaSyBr1ehjxkXlICK-Zu0Wu_zUg8H68aQAp5k",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            const { id_token, refresh_token } = result.data;
            const tokens = { idToken: id_token, refreshToken: refresh_token };

            store.dispatch("users/refreshTokens", tokens);
            TokenService.updateTokens(tokens);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
