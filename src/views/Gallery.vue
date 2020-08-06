<template>
  <section class="gallery">
    <div class="gallery__container">
      <h1>Galeria</h1>
      <div class="gallery--items__container">
        <PhotoGallery
          v-if="galleries.length > 0"
          :images="galleries"
          routeComponentName="GalleryItem"
          :displayImageOnly="false"
          :zoomedPhotos="false"
          :displayOverlay="true"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PhotoGallery from "@/components/PhotoGallery.vue";

@Component({
  components: {
    PhotoGallery
  }
})
export default class OurCentrum extends Vue {
  async created() {
    await this.$store.dispatch("fetchGalleries");
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
  get galleries() {
    return this.$store.getters.galleries;
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
    padding: $verticalPadding * 2 $horizontalPadding / 2 $verticalPadding
      $horizontalPadding / 2;
    @include flex;
    .photoGallery .photoGallery__container {
      padding-left: 0;
      padding-right: 0;
      .grid {
        grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
      }
    }
  }
}
</style>
