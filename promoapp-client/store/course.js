export const state = () => {
  return {
    items: []
  };
};

export const actions = {
  fetchCourses({ commit }) {
    return this.$axios.$get("/api/v1/product").then(courses => {
      commit(
        "setItems",
        { resource: "course", items: courses },
        { root: true }
      );
      return state.items;
    });
  }
};
