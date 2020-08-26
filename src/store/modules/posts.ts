import Vue from 'vue';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { InstagramPost } from "@/utils/interfaces/Posts";

const state = {
  posts: [] as InstagramPost[] | undefined
};

const mutations = {
  setPosts(state: { posts: InstagramPost[] }, payload: InstagramPost[]) {
    state.posts = payload;
  },
  addPost(state: { posts: InstagramPost[] }, payload: InstagramPost) {
    state.posts.push(payload);
  },
  acceptPost(state: { posts: InstagramPost[] }, payload: string) {
    const foundPost = state.posts.find(post => post.id === payload);
    if (foundPost) foundPost.accepted = true;
  },
  removePost(state: { posts: InstagramPost[] }, payload: string) {
    const foundPost = state.posts.find(post => post.id === payload);
    if (foundPost) {
      const index = state.posts.indexOf(foundPost);
      state.posts.splice(index, 1);
    }
  }
};

const actions = {
  getPosts({ commit, state }: any) {
    if(state.posts.length <= 0) {
      commit("setLoading", true);
      commit("clearError");
      firebase.database().ref("/posts").limitToLast(100).once("value").then(snapshot => {
        const posts = Object.values(snapshot.val());
        commit("setPosts", posts);
        commit("setLoading", false);
      }).catch(e => {
        commit("setLoading", false);
        console.log(e);
      })
    }
  },
  addPost({ commit, state }: any, payload: InstagramPost) {
    commit("clearError");
    const foundPost = state.posts.find((post: InstagramPost) => post.link.includes(payload.link));
    if(foundPost) {
      Vue.toasted.error("Podany post został już zgłoszony.");
      return;
    } else {
      const currentTime = new Date();
      firebase
      .database()
      .ref("/posts/")
      .push(payload).then(response => {
        commit("addPost", payload);
        const post = {
          ...payload,
          id: response.key,
          submitDate: currentTime
        }
        firebase
            .database()
            .ref("/posts/" + post.id)
            .update(post);
        Vue.toasted.success("Post pomyślnie wysłany.");
      }).catch((e) => {
        Vue.toasted.error(e);
      })
    }
  },
  acceptPost({ commit, state }: any, payload: string) {
    commit("setLoading", true);
    commit("clearError");
    firebase.database().ref("/posts/" + payload).update({ accepted: true }).then(() => {
      commit("acceptPost", payload);
      commit("setLoading", false);
    }).catch(e => console.log(e));
  },
  removePost({ commit, state }: any, payload: InstagramPost) {
    commit("setLoading", true);
    commit("clearError");
    firebase.database().ref("/posts/" + payload).remove().then(() => {
      commit("removePost", payload);
      commit("setLoading", false);
    }).catch(e => console.log(e));
  }
};

const getters = {
  posts(state: { posts: InstagramPost[] }) {
    return state.posts;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
