export const state = () => {
  return {
    user: null
  };
};

export const actions = {
  login({ commit, state }, loginData) {
    return this.$axios
      .$post("/api/v1/user/login", loginData)
      .then(user => {
        commit("setAuthUser", user);
        return state.user;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  }
};
