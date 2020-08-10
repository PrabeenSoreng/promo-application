export const state = () => {
  return {
    courses: []
  };
};

export const actions = {
  fetchInstructorCourses({ commit, state }) {
    return this.$axios
      .$get("/api/v1/product/user-products")
      .then(courses => {
        commit("setCourses", courses.data);
        return state.courses;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses;
  }
};

export const getters = {
  instructorCourses(state) {
    return state.courses || null;
  }
};