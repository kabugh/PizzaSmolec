<template>
  <section class="gallery">
    <div class="gallery__container">
      <h1>Galeria - {{ $route.params.name }}</h1>
      <div
        class="gallery--items__container"
        v-if="!currentGallery.nestedGallery"
      >
        <PhotoGallery
          v-if="Object.keys(currentGallery).length > 0"
          :images="mappedGallery(currentGallery.images)"
          :displayImageOnly="true"
          :zoomedPhotos="true"
          :displayOverlay="true"
        />
      </div>
      <div class="gallery--items__container" v-else>
        <div
          class="gallery--item__container"
          v-for="(item, index) in currentGallery.nestedGalleryItems"
          :key="index"
        >
          <h1>{{ item.fields.title }}</h1>
          <PhotoGallery
            v-if="item.fields.images.length > 0"
            :images="mappedGallery(item.fields.images)"
            :displayImageOnly="true"
            :zoomedPhotos="true"
            :displayOverlay="true"
            :nestedGallery="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PhotoGallery from "@/components/PhotoGallery.vue";
import GalleryItemInterface from "@/utils/interfaces/GalleryItemInterface";

@Component({
  components: {
    PhotoGallery
  }
})
export default class GalleryItem extends Vue {
  @Prop() passedItem!: GalleryItemInterface;

  async mounted() {
    if (this.$props.passedItem !== undefined) {
      if (this.$props.passedItem.slug === this.$route.params.name) {
        this.currentGallery = this.$props.passedItem;
        this.overlayLoading = false;
      }
    } else {
      await this.$store.dispatch("fetchGallery", this.$route.params.name);
      this.overlayLoading = false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mappedGallery(images: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return images.map((image: any) => ({
      title: image.fields.title,
      url: image.fields.file.url
    }));
  }

  set currentGallery(value) {
    this.$store.commit("setCurrentGallery", value);
  }
  get currentGallery() {
    return this.$store.getters.currentGallery;
  }

  get overlayLoading() {
    return this.$store.getters.overlayLoading;
  }
  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
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
    @include flex;
    .gallery--item__container {
      .photoGallery .photoGallery__container {
        padding-left: 0;
        padding-right: 0;
        .grid {
          grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
        }
      }
    }
  }
}
</style>
