import Vue from "vue";

export const state = () => {
  return {
    blog: {},
    blogs: {
      all: [] || null,
      featured: [] || null
    },
    pagination: {
      count: 0, // Count of all of our published blogs
      pageCount: 0, // How many pages we want to display
      pageSize: 3, // How many blogs we want to display
      pageNum: 1 // Current page
    }
  };
};

export const actions = {
  fetchBlogs({ commit, state }, filter) {
    const url = this.$applyParamsToUrl(`/api/v1/blog`, filter);

    return this.$axios
      .$get(url)
      .then(({ data, count, pageCount }) => {
        commit("setBlogs", { resource: "all", blogs: data });
        commit("setPagination", { count, pageCount });
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
  },
  setPagination(state, { count, pageCount }) {
    Vue.set(state.pagination, "count", count);
    Vue.set(state.pagination, "pageCount", pageCount);
  },
  setPage(state, currentPage) {
    Vue.set(state.pagination, "pageNum", currentPage);
  }
};
