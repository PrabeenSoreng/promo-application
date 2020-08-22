export const state = () => {
  return {
    blog: {}
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
    return this.$axios
      .$patch(`/api/v1/blog/${id}`, data)
      .then(blog => {
        commit("setBlog", blog.data);
        return state.blog;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setBlog(state, blog) {
    state.blog = blog;
  }
};
