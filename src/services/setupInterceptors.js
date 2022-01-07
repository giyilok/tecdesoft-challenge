import axiosInstance from "./api.service.js";
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

          try {
            const rs = await axiosInstance.post(
              "https://securetoken.googleapis.com/v1/token?key=AIzaSyBr1ehjxkXlICK-Zu0Wu_zUg8H68aQAp5k",
              {
                grant_type: "refresh-token",
                refreshToken: TokenService.getRefreshToken(),
              }
            );

            const { id_token, refresh_token } = rs.data;

            store.dispatch("users/refreshToken", { id_token, refresh_token });
            TokenService.updateTokens({ id_token, refresh_token });

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
