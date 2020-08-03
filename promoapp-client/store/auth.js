export const state = () => {
  return {
    user: null
  };
};

export const actions = {
  register({ commit, state }, registerData) {
    return this.$axios
      .$post("/api/v1/user/signup", registerData)
      .catch(error => Promise.reject(error));
  },
  login({ commit, state }, loginData) {
    return this.$axios
      .$post("/api/v1/user/login", loginData)
      .then(user => {
        commit("setAuthUser", user.data);
        return state.user;
      })
      .catch(error => Promise.reject(error));
  },
  getAuthUser({ commit, getters, state }) {
    const authUser = getters.authUser;
    if (authUser) return Promise.resolve(authUser);
    return this.$axios
      .$get("/api/v1/user/me")
      .then(user => {
        commit("setAuthUser", user.data);
        return state.user;
      })
      .catch(error => {
        commit("setAuthUser", null);
        return Promise.reject(error);
      });
  },
  logout({ commit, state }) {
    return this.$axios
      .$post("/api/v1/user/logout")
      .then(() => {
        commit("setAuthUser", null);
        return true;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  }
};

export const getters = {
  authUser(state) {
    // console.log(state.user);
    return state.user || null;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  isAdmin(state) {
    return state.user && state.user.role && state.user.role === "admin";
  }
};
