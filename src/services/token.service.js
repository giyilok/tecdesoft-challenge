const tokenService = {
  getIdToken() {
    const user = JSON.parse(localStorage.getItem("x-user"));
    return user?.idToken;
  },

  getRefreshToken() {
    const user = JSON.parse(localStorage.getItem("x-user"));
    console.log("En getRefreshToken ", user.refreshToken);
    return user?.refreshToken;
  },

  updateTokens({ idToken, refreshToken }) {
    let user = JSON.parse(localStorage.getItem("x-user"));
    user.idToken = idToken;
    user.refreshToken = refreshToken;
    localStorage.setItem("x-user", JSON.stringify(user));
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
