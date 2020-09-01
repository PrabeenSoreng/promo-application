export const state = () => {
  return {
    items: [],
    item: {}
  };
};

export const actions = {
  fetchCourses({ commit }) {
    return this.$axios.$get("/api/v1/product").then(courses => {
      commit(
        "setItems",
        { resource: "course", items: courses.data },
        { root: true }
      );
      return state.items;
    });
  },
  fetchCourseBySlug({ commit, state }, slug) {
    return this.$axios
      .$get(`/api/v1/product/s/${slug}`)
      .then(course => {
        commit("setCourse", course.data);
        return state.course;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setCourse(state, course) {
    state.item = course;
  }
};
