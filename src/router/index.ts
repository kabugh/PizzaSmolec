import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const overlayGuard = (to: Route, from: Route, next: Function) => {
  store.commit("setNav", false);
  next();
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
    path: "/galeria/:name",
    name: "GalleryItem",
    component: () =>
      import(/* webpackChunkName: "galleryItem" */ "../views/GalleryItem.vue"),
    props: true,
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
    path: "/kontakt",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "contact" */ "../views/Contact.vue"),
    beforeEnter: overlayGuard,
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
