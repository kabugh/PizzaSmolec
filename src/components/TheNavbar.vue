<template>
  <nav class="navbar" :class="{ hiddenNavbar: !showNavbar && !isNavOpen }">
    <div class="back__wrapper" v-if="$route.path !== '/'">
      <div class="arrow" @click="$router.go(-1)"></div>
      <div class="back" @click="$router.go(-1)">Powrót</div>
    </div>
    <div class="back__wrapper" v-else></div>
    <div class="logo" v-scroll-to="'body'">
      <img src="@/assets/images/logo_white.png" alt="logo" />
    </div>
    <div class="burger__wrapper">
      <div
        class="nav-mobile"
        id="nav-icon"
        :class="{ open: isNavOpen }"
        @click="isNavOpen = !isNavOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheNavbar extends Vue {
  offset = 5;
  lastScrollPosition = 0;
  scrollValue = 0;
  showNavbar = false;

  mounted() {
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    if (window.pageYOffset < 0) return;
    if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.offset)
      return;

    this.showNavbar = window.pageYOffset < this.lastScrollPosition;
    this.lastScrollPosition = window.pageYOffset;
  }

  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }

  set isNavOpen(value) {
    this.$store.commit("setNav", value);
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";

.navbar {
  width: 100%;
  min-height: 6vh;
  background-color: black;
  position: fixed;
  padding: 15px 6vw;
  z-index: 100;
  transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &.hiddenNavbar {
    transform: translateY(-100%);
  }
  .logo {
    max-width: 40vw;
    max-height: 8vh;
    color: white;
    @include backgroundDefault;
    @include flex;
    flex-direction: row;
    text-align: center;
    flex: 2;
    &:hover {
      cursor: pointer;
    }
    h3 {
      text-transform: uppercase;
      font-size: 24px;
      letter-spacing: 2px;
      font-weight: bolder;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  .back__wrapper {
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    .arrow {
      background-image: url("../assets/images/icons/arrow.png");
      @include backgroundDefault;
      width: 36px;
      height: 36px;
      margin-right: 15px;
    }
    .arrow:hover,
    .back:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    @media (max-width: 700px) {
      .back {
        display: none;
      }
    }
  }
  .burger__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    height: 100%;
    #nav-icon,
    #nav-icon-static {
      display: block;
      width: 25px;
      height: 20px;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.5s ease-in-out;
      -moz-transition: 0.5s ease-in-out;
      -o-transition: 0.5s ease-in-out;
      transition: 0.5s ease-in-out;
      cursor: pointer;
      z-index: 100;
    }
    #nav-icon-static {
      position: static !important;
      margin-top: 0 !important;
      margin-right: 0 !important;
    }
    #nav-icon span,
    #nav-icon-static span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: white;
      opacity: 1;
      top: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
    }
    #nav-icon-static:not(.open):hover span:first-child {
      width: 16px;
    }
    #nav-icon-static:not(.open):hover span:nth-child(2) {
      width: 20px;
    }
    #nav-icon-static:not(.open):hover span:nth-child(3) {
      width: 24px;
    }
    #nav-icon span:nth-child(1),
    #nav-icon-static span:nth-child(1),
    #nav-icon:not(.open):hover {
      top: 0;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;
    }
    #nav-icon span:nth-child(2),
    #nav-icon-static span:nth-child(2) {
      top: 8px;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;
    }
    #nav-icon span:nth-child(3),
    #nav-icon-static span:nth-child(3) {
      top: 16px;
      -webkit-transform-origin: left center;
      -moz-transform-origin: left center;
      -o-transform-origin: left center;
      transform-origin: left center;
    }
    #nav-icon-static.open span:nth-child(1),
    #nav-icon.open span:nth-child(1) {
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      top: -3px;
    }
    #nav-icon-static.open span:nth-child(2),
    #nav-icon.open span:nth-child(2) {
      width: 0;
      opacity: 0;
    }
    #nav-icon-static.open span:nth-child(3),
    #nav-icon.open span:nth-child(3) {
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      top: 15px;
    }
  }

  @media (min-width: 450px) {
    .logo {
      max-width: 30vw;
    }
  }
  @media (min-width: 768px) {
    .logo {
      max-width: 25vw;
    }
  }
  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    .logo {
      max-width: 30vw;
      max-height: 10vh;
    }
  }
  @media (min-width: 1024px) {
    .logo {
      max-width: 20vw;
    }
  }
  @media (min-width: 1280px) {
    .logo {
      max-width: 15vw;
    }
  }
  @media (min-width: 1650px) {
    .logo {
      max-width: 10vw;
    }
  }
}
</style>
