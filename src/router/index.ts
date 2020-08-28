import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const overlayGuard = (to: Route, from: Route, next: Function) => {
  store.commit("setNav", false);
  next();
};

const authGuard = (to: Route, from: Route, next: Function) => {
  if (store.getters.user) {
    store.commit("setNav", false);
    next({ to: 'Admin', params: { isAuthenticated: true }});
  } else {
    next({ to: 'Admin', params: { isAuthenticated: false }});
  }
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: overlayGuard,
    meta: {
      initialNav: false
    }
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  },
  {
    path: "/nasza-jakosc",
    name: "OurQuality",
    component: () =>
      import(/* webpackChunkName: "ourQuality" */ "../views/OurQuality.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  },
  {
    path: "/nasze-centrum",
    name: "OurCentrum",
    component: () =>
      import(/* webpackChunkName: "ourCentrum" */ "../views/OurCentrum.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: false
    }
  },
  {
    path: "/galeria",
    name: "Gallery",
    component: () =>
      import(/* webpackChunkName: "gallery" */ "../views/Gallery.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  },
  {
    path: "/dostawa",
    name: "Delivery",
    component: () =>
      import(/* webpackChunkName: "delivery" */ "../views/Delivery.vue"),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  },
  {
    path: "/klienci",
    name: "ClientsPhotos",
    component: () =>
      import(
        /* webpackChunkName: "clientsPhotos" */ "../views/ClientsPhotos.vue"
      ),
    beforeEnter: overlayGuard,
    meta: {
      initialNav: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    beforeEnter: authGuard,
    meta: {
      initialNav: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
