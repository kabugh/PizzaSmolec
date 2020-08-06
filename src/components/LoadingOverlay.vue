<template>
  <section class="loading__overlay" ref="overlay">
    <div class="loading__overlay--container">
      <div
        class="logo"
        data-aos="fade-down"
        data-aos-duration="900"
        data-aos-delay="150"
        data-aos-easing="ease-in-out-quart"
        ref="logo"
      ></div>
      <div class="spinner" ref="spinner">
        <div class="mask">
          <div class="maskedCircle"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Watch, Component } from "vue-property-decorator";
import slideAnimations from "@/utils/slideAnimations";
import { TimelineLite } from "gsap";

@Component
export default class LoadingOverlay extends Vue {
  get overlayLoading() {
    return this.$store.getters.overlayLoading;
  }

  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
  }

  beforeCreate() {
    document.body.style.overflowY = "hidden";
  }

  mounted() {
    this.overlayLoading = false;
  }

  @Watch("overlayLoading")
  onLoadAnimation() {
    const timeline1 = new TimelineLite();
    const timeline2 = new TimelineLite();
    timeline1.to(this.$refs.logo, { opacity: 0, y: -50 });
    timeline2.to(this.$refs.spinner, { opacity: 0 });
    slideAnimations.hideElement(this.$refs.overlay);
    setTimeout(() => (document.body.style.overflowY = "visible"), 500);
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.loading__overlay {
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: black;
  @include flex;
  flex-direction: row;
  z-index: 100;
  .loading__overlay--container {
    @include flex;
    .logo {
      width: 200px;
      height: 100px;
      background-image: url("../assets/images/logo_white.png");
      @include backgroundDefault;
      background-size: contain;
      margin-bottom: 5vh;
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .maskedCircle {
      width: 20px;
      height: 20px;
      border-radius: 12px;
      border: 3px solid white;
    }
    .mask {
      width: 12px;
      height: 12px;
      overflow: hidden;
    }
    .spinner {
      width: 26px;
      height: 26px;
      animation: spin 1s infinite linear;
    }
  }

  @media (min-width: 768px) and (min-height: 500px) {
    .loading__overlay--container .logo {
      width: 240px;
      height: 120px;
    }
  }
}
</style>
