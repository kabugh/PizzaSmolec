import { InstagramPost } from "@/utils/interfaces/Posts";

const state = {
  posts: [
    {
      accepted: true,
      link: "https://www.instagram.com/p/CEKQ23bBIRa/"
    },
    {
      accepted: true,
      link: "https://www.instagram.com/p/CEKQ23bBIRa/"
    },
    {
      accepted: false,
      link: "https://www.instagram.com/p/CEKQ23bBIRa/"
    }
  ] as InstagramPost[]
};

const mutations = {
  setPosts(state: { posts: InstagramPost[] }, payload: InstagramPost[]) {
    state.posts = payload;
  },
  addPost(state: { posts: InstagramPost[] }, payload: InstagramPost) {
    state.posts.push(payload);
  },
  acceptPost(state: { posts: InstagramPost[] }, payload: InstagramPost) {
    const foundPost = state.posts.find(post => post === payload);
    if (foundPost) foundPost.accepted = true;
  },
  removePost(state: { posts: InstagramPost[] }, payload: InstagramPost) {
    const foundPost = state.posts.find(post => post === payload);
    if (foundPost) {
      const index = state.posts.indexOf(foundPost);
      state.posts.splice(index, 1);
    }
  }
};

const actions = {
  addPost({ commit, state }: any, payload: InstagramPost) {
    commit("addPost", payload);
  },
  acceptPost({ commit, state }: any, payload: InstagramPost) {
    commit("acceptPost", payload);
  },
  removePost({ commit, state }: any, payload: InstagramPost) {
    commit("removePost", payload);
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
