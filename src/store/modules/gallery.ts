import GalleryItemInterface from "@/utils/interfaces/GalleryItemInterface";
/* eslint-disable @typescript-eslint/no-var-requires */
const contentful = require("contentful");

const client = contentful.createClient({
  space: process.env.VUE_APP_space,
  accessToken: process.env.VUE_APP_accessToken
});

const state = {
  galleries: [] as GalleryItemInterface[],
  currentGallery: {} as GalleryItemInterface
};

const mutations = {
  setGalleries(state: { galleries: GalleryItemInterface[] }, payload: any) {
    state.galleries = payload;
  },
  setCurrentGallery(
    state: { currentGallery: GalleryItemInterface },
    payload: any
  ) {
    state.currentGallery = payload;
  }
};

const getters = {
  galleries(state: { galleries: any }) {
    return state.galleries;
  },
  currentGallery(state: { currentGallery: GalleryItemInterface }) {
    return state.currentGallery;
  }
};

const actions = {
  fetchGalleries({ commit, state }: any) {
    if (state.galleries.length === 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.createdAt",
          /* eslint-disable @typescript-eslint/camelcase */
          content_type: "gallery",
          include: 2 // specified level of references, links
        })
        .then((entries: { items: any[] }) => {
          const galleries = entries.items.map((a: any) => a.fields);
          commit("setGalleries", galleries);
          commit("setLoading", false);
        });
    } else {
      commit("setGalleries", state.galleries);
    }
  },
  fetchGallery({ commit, state }: any, slug: string) {
    if (state.galleries.length === 0) {
      commit("setLoading", true);
      commit("clearError");
      client
        .getEntries({
          order: "sys.updatedAt",
          content_type: "gallery",
          "fields.slug[match]": slug
        })
        .then((entries: { items: any[] }) => {
          commit("setCurrentGallery", entries.items[0].fields);
          commit("setLoading", false);
        });
    } else {
      const foundGallery = state.galleries.find(
        (gallery: GalleryItemInterface) => gallery.slug === slug
      );
      commit("setCurrentGallery", foundGallery);
    }
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
