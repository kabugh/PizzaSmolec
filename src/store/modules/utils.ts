const state = {
  isNavOpen: false,
  loading: false,
  error: null,
  overlayLoading: true,
  videoModal: false,

  socialsItems: [
    {
      icon: "ig.png",
      link: "https://www.instagram.com/tenisplanetsmolec/"
    },
    {
      icon: "fb.png",
      link: "https://www.facebook.com/tenisplanetsmolec/"
    },
    {
      icon: "yt.png",
      link: "https://www.youtube.com/channel/UCKD_wDLcAK9FTLmjDOAyHhQ"
    }
  ]
};

const mutations = {
  setNav(state: { isNavOpen: boolean }, payload: boolean) {
    state.isNavOpen = payload;
  },
  setLoading(state: { loading: boolean }, payload: boolean) {
    state.loading = payload;
  },
  setError(state: { error: string }, payload: string) {
    state.error = payload;
  },
  clearError(state: { error: null }) {
    state.error = null;
  },
  setOverlayLoading(state: { overlayLoading: boolean }, payload: boolean) {
    state.overlayLoading = payload;
  },
  setVideoModal(state: { videoModal: boolean }, payload: boolean) {
    state.videoModal = payload;
  }
};

const getters = {
  isNavOpen(state: { isNavOpen: boolean }) {
    return state.isNavOpen;
  },
  loading(state: { loading: boolean }) {
    return state.loading;
  },
  error(state: { error: string }) {
    return state.error;
  },
  overlayLoading(state: { overlayLoading: boolean }) {
    return state.overlayLoading;
  },
  socialsItems(state: { socialsItems: Array<{ icon: string; link: string }> }) {
    return state.socialsItems;
  },
  videoModal(state: { videoModal: boolean }) {
    return state.videoModal;
  }
};

export default {
  state,
  mutations,
  getters
};
