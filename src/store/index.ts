import Vue from "vue";
import Vuex from "vuex";
import utils from "./modules/utils";
import gallery from "./modules/gallery";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    utils,
    gallery
  }
});
