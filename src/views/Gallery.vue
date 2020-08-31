<template>
  <section class="gallery">
    <div class="gallery__container">
      <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
        Galeria
      </h1>
      <h2 data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
        Zaobserwuj nas na Instagramie
        <a href="https://www.instagram.com/tenis_planet/" target="_blank"
          >@tenis_planet</a
        >
      </h2>
      <div class="gallery--items__container">
        <Instagram />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Instagram from "@/components/Instagram.vue";

@Component({
  components: {
    Instagram
  }
})
export default class Gallery extends Vue {
  async created() {
    this.overlayLoading = false;
  }
  get overlayLoading() {
    return this.$store.getters.overlayLoading;
  }
  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
  }
  get loading() {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.gallery {
  width: 100%;
  color: black;
  min-height: 70vh;
  .gallery__container {
    padding: $verticalPadding * 3 $horizontalPadding / 2 $verticalPadding
      $horizontalPadding / 2;
    @include flex;
    > h1 {
      font-size: 1.75rem;
      font-weight: 700;
    }
    > h2 {
      font-size: 1.25rem;
      font-weight: 500;
      margin-top: $verticalPadding / 2;
      text-align: center;
      a {
        color: black;
        text-decoration: none;
        transition: color 0.3s ease-in-out;
        &:hover {
          color: $mainColor;
          cursor: pointer;
        }
      }
    }
    .photoGallery .photoGallery__container {
      padding-left: 0;
      padding-right: 0;
    }
    @media (min-width: 768px) and (min-height: 500px) {
      > h1 {
        font-size: 2.25rem;
      }
    }
    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      padding-top: $verticalPadding * 4;
    }
  }
}
</style>
