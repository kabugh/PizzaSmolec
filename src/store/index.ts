import Vue from "vue";
import Vuex from "vuex";
import utils from "./modules/utils";
import gallery from "./modules/gallery";
import pizzaOfTheMonth from "./modules/pizzaOfTheMonth";
import posts from "./modules/posts";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    utils,
    gallery,
    pizzaOfTheMonth,
    posts
  }
});
