export const state = () => {
  return {
    heroes: [] || null
  };
};

export const actions = {
  fetchHeroes({ commit, state }) {
    return this.$axios
      .$get("/api/v1/product-hero")
      .then(({ data }) => {
        commit("setHeroes", data);
        return state.heroes;
      })
      .catch(error => Promise.reject(error));
  },
  activateHero({ commit, state }, heroId) {
    return this.$axios
      .$patch(`/api/v1/product-hero/${heroId}`)
      .then(activeHero => {
        commit("hero/setHero", activeHero, { root: true });
        return activeHero;
      })
      .catch(error => Promise.reject(error));
  }
};

export const mutations = {
  setHeroes(state, heroes) {
    state.heroes = heroes;
  }
};
