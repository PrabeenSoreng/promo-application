export const state = () => {
  return {
    blogs: {
      all: [] || null,
      featured: [] || null
    }
  };
};

export const actions = {
  fetchBlogs({ commit, state }) {
    return this.$axios
      .$get("/api/v1/blog")
      .then(({ data }) => {
        commit("setBlogs", { resource: "all", blogs: data });
        return state.blogs.all;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setBlogs(state, { resource, blogs }) {
    state.blogs[resource] = blogs;
  }
};
