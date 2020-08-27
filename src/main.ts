import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import AOS from "aos";
import "aos/dist/aos.css";
import VueScrollTo from "vue-scrollto";
import { gsap, TimelineLite, TimelineMax } from "gsap";
import VueYoutube from "vue-youtube";
import * as firebase from "firebase/app";
import "firebase/auth";
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 5000,
  action : {
    text : 'Zamknij',
    onClick : (e, toastObject) => {
        toastObject.goAway(0);
    }
  }
});
Vue.use(VueYoutube);

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
  created() {
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_apiKey,
      authDomain: process.env.VUE_APP_authDomain,
      databaseURL: process.env.VUE_APP_databaseURL,
      projectId: process.env.VUE_APP_projectId,
      storageBucket: process.env.VUE_APP_storageBucket,
      messagingSenderId: process.env.VUE_APP_messagingSenderId,
      appId: process.env.VUE_APP_appId
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
  },
  render: h => h(App)
}).$mount("#app");
