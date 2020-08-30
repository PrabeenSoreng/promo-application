export const state = () => {
  return {
    item: null
  };
};

export const actions = {
  createHero({ commit, state }, courseHeroData) {
    return this.$axios
      .$post("/api/v1/product-hero", courseHeroData)
      .then(hero => {
        commit("setHero", hero.data);
        return state.item;
      })
      .catch(error => Promise.reject(error));
  },
  fetchHero({ commit, state }) {
    return this.$axios
      .$get("/api/v1/product-hero")
      .then(({ data }) => {
        console.log(data);
        commit("setHero", data[0]);
        return state.item;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setHero(state, hero) {
    state.item = hero;
  }
};
