export const state = () => {
  return {
    blog: {},
    isSaving: false
  };
};

export const actions = {
  createBlog(_, blogData) {
    return this.$axios
      .$post("/api/v1/blog", blogData)
      .then(blog => blog)
      .catch(error => Promise.reject(error));
  },
  fetchBlogById({ commit, state }, blogId) {
    return this.$axios
      .$get(`/api/v1/blog/${blogId}`)
      .then(blog => {
        commit("setBlog", blog.data);
        return state.blog;
      })
      .catch(error => Promise.reject(error));
  },
  updateBlog({ commit, state }, { data, id }) {
    commit("setIsSaving", true);
    return this.$axios
      .$patch(`/api/v1/blog/${id}`, data)
      .then(blog => {
        commit("setBlog", blog.data);
        commit("setIsSaving", false);
        return state.blog;
      })
      .catch(error => {
        commit("setIsSaving", false);
        return Promise.reject(error);
      });
  }
};

export const mutations = {
  setBlog(state, blog) {
    state.blog = blog;
  },
  setIsSaving(state, isSaving) {
    state.isSaving = isSaving;
  }
};
