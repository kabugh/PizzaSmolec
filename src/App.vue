<template>
  <div id="app">
    <LoadingOverlay />
    <!-- <TheNavbar /> -->
    <transition name="navOverlay">
      <NavOverlay v-if="isNavOpen" />
    </transition>
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
    <TheFooter />
  </div>
</template>
<script lang="ts">
import { Vue, Watch, Component } from "vue-property-decorator";
import LoadingOverlay from "./components/LoadingOverlay.vue";
// import TheNavbar from "./components/TheNavbar.vue";
import NavOverlay from "./components/NavOverlay.vue";
import TheFooter from "./components/TheFooter.vue";

@Component({
  components: { LoadingOverlay, NavOverlay, TheFooter }
})
export default class App extends Vue {
  get isNavOpen(): boolean {
    return this.$store.getters.isNavOpen;
  }

  @Watch("isNavOpen")
  blockOverflow() {
    this.isNavOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";
</style>
