const tokenService = {
  getIdToken() {
    const user = JSON.parse(localStorage.getItem("user"));

    return user?.idtoken;
  },

  getRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));

    return user?.refreshToken;
  },

  updateTokens({ id_token, refresh_token }) {
    let user = JSON.parse(localStorage.getItem("user"));
    //user = {...user, idToken: id_token, refreshToken: refresh_token}
    user.idToken = id_token;
    user.refreshToken = refresh_token;
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    const user = JSON.parse(localStorage.getItem("x-user"));
    return user;
  },

  setUser(user) {
    localStorage.setItem("x-user".JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem("x-user");
  },
};

export default tokenService;
