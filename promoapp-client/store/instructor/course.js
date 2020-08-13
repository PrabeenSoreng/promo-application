export const state = () => {
  return {
    courses: [],
    course: {}
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
  },
  fetchCourseById({ commit, state }, productId) {
    return this.$axios
      .$get(`/api/v1/product/${productId}`)
      .then(course => {
        commit("setCourse", course.data);
        return state.course;
      })
      .catch(error => Promise.reject(error));
  },
  createCourse({ commit, state }, newCourse) {
    return this.$axios.$post("/api/v1/product", newCourse);
  },
  updateLine({ commit }, { index, value, field }) {
    commit("setLineValue", { index, value, field });
  }
};

export const mutations = {
  setCourses(state, courses) {
    state.courses = courses;
  },
  setCourse(state, course) {
    state.course = course;
  },
  addLine(state, field) {
    state.course[field].push({ value: "" });
  },
  removeLine(state, { field, index }) {
    state.course[field].splice(index, 1);
  },
  setLineValue(state, { index, value, field }) {
    state.course[field][index].value = value;
  }
};

export const getters = {
  instructorCourses(state) {
    return state.courses || null;
  }
};
