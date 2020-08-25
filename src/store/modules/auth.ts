import Vue from "vue";
import { User } from "@/utils/interfaces/User";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import router from "@/router";
import Toasted from "vue-toasted";

const state = {
  user: null
};

const mutations = {
  setUser(state: { user: User }, payload: User) {
    state.user = payload;
  }
};

const actions = {
  signUserIn({ commit }: any, payload: { email: string; password: string }) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        if (response && response.user) {
          const newUser: User = {
            id: response.user.uid,
            email: payload.email
          };
          commit("setUser", newUser);
          commit("setLoading", false);
        }
      })
      .catch((e) => {
        commit("setLoading", false);
        commit("setError", e);
        if (e.code === "auth/wrong-password") {
          Vue.toasted.error("Podane hasło jest niepoprawne.");
        } else {
          Vue.toasted.error(
            "Wystąpił błąd. Spróbuj ponownie później lub skontaktuj się z Administratorem."
          );
        }
      });
  },
  autoSignIn({ commit }: any, payload: any) {
    const cachedUser: User = {
      id: payload.uid,
      email: payload.email
    };
    commit("setUser", cachedUser);
  },
  signUserOut({ commit }: any) {
    commit("setLoading", true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("setUser", null);
        commit("setLoading", false);
        router.push("/");
      })
      .catch((e) => console.log(e));
  },
};

const getters = {
  user(state: { user: User }) {
    return state.user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
