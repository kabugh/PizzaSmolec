import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import AOS from "aos";
import "aos/dist/aos.css";
import VueScrollTo from "vue-scrollto";
import { gsap, TimelineLite, TimelineMax } from "gsap";
import * as GmapVue from "gmap-vue";

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_map,
    libraries: "places", // This is required if you use the Autocomplete plugin
    region: "PL",
    language: "PL"
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'gmap-vue/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

Vue.use(VueScrollTo, {
  easing: [0.86, 0, 0.07, 1],
  duration: 1500,
  onStart: () => {
    if (store.getters.isNavOpen) store.commit("setNav", false);
  }
});

AOS.init({
  easing: "ease-in-out-quart"
});

gsap.registerPlugin(TimelineLite, TimelineMax);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
