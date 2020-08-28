import Vue from "vue";
import Vuex from "vuex";
import utils from "./modules/utils";
import pizzaOfTheMonth from "./modules/pizzaOfTheMonth";
import posts from "./modules/posts";
import auth from "./modules/auth";

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    utils,
    pizzaOfTheMonth,
    posts,
    auth
  }
});
