export const state = () => {
  return {
    items: []
  };
};

export const actions = {
  fetchCategories({ commit, state, getters }) {
    if (getters.hasCategories) return;

    return this.$axios
      .$get("/api/v1/category")
      .then(categories => {
        commit("setCategories", categories.data);
        return state.items;
      })
      .catch(err0r => Promise.reject(err0r));
  }
};

export const mutations = {
  setCategories(state, categories) {
    state.items = categories;
  }
};

export const getters = {
  hasCategories(state) {
    return state.items.length > 0;
  }
};
