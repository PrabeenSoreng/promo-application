export const state = () => {
  return {
    user: null
  };
};

export const actions = {
  login({ commit }, loginData) {
    return this.$axios
      .$post("/api/v1/user/login", loginData)
      .then(user => {
        commit("setAuthUser", user);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};

export const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  }
};
