/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

import PizzaOfTheMonth from "@/utils/interfaces/PizzaOfTheMonth";

const state = {
  pizzaOfTheMonth: {} as PizzaOfTheMonth
};

const mutations = {
  setPizzaOfTheMonth(
    state: { pizzaOfTheMonth: PizzaOfTheMonth },
    payload: any
  ) {
    state.pizzaOfTheMonth = payload;
  }
};

const getters = {
  pizzaOfTheMonth(state: { pizzaOfTheMonth: PizzaOfTheMonth }) {
    return state.pizzaOfTheMonth;
  }
};

const actions = {
  fetchPizzaOfTheMonth({ commit, state }: any) {
    if (Object.keys(state.pizzaOfTheMonth).length === 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          /* eslint-disable @typescript-eslint/camelcase */
          content_type: "pizzaOfTheMonth"
        })
        .then((entries: { items: any[] }) => {
          const pizzaOfTheMonth = entries.items.map((a: any) => a.fields);
          commit("setPizzaOfTheMonth", pizzaOfTheMonth[0]);
          commit("setLoading", false);
        });
    } else {
      commit("setPizzaOfTheMonth", state.pizzaOfTheMonth);
    }
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
