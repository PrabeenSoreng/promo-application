export const state = () => {
  return {
    blog: {},
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
  },
  fetchFeaturedBlogs({ commit, state }, filter) {
    const url = this.$applyParamsToUrl(`/api/v1/blog`, filter);
    return this.$axios
      .$get(url)
      .then(({ data }) => {
        commit("setBlogs", { resource: "featured", blogs: data });
        return state.blogs.featured;
      })
      .catch(error => Promise.reject(error));
  },
  fetchBlogBySlug({ commit, state }, slug) {
    return this.$axios
      .$get(`/api/v1/blog/s/${slug}`)
      .then(({ data }) => {
        commit("setBlog", data);
        return state.blog;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setBlogs(state, { resource, blogs }) {
    state.blogs[resource] = blogs;
  },
  setBlog(state, blog) {
    state.blog = blog;
  }
};
