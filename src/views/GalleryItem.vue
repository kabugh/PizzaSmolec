<template>
  <section class="gallery">
    <div class="gallery__container">
      <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
        Galeria - {{ $route.params.name }}
      </h1>
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
          <div
            class="title__container"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <svg
              width="63"
              height="10"
              viewBox="0 0 63 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50.033 0l-6.117 7.041L37.927.113V.008l-.114.052-.12-.06-6.16 7.032L25.34 0l-6.173 7.041L13.008 0 6.855 7.041 1.41.807 0 2.153 6.849 10l6.146-7.04L19.139 10l6.145-7.04 4.75 5.344L31.525 10l.008-.009.008.009 6.215-6.993L43.86 10l6.145-7.04L56.15 10 63 2.153 61.6.807 56.166 7.04z"
                fill="#d4dd1f"
                fill-rule="evenodd"
              ></path>
            </svg>
            <h2>
              {{ item.fields.title }}
            </h2>
          </div>

          <PhotoGallery
            v-if="item.fields.images.length > 0"
            :images="mappedGallery(item.fields.images)"
            :displayImageOnly="true"
            :zoomedPhotos="true"
            :displayOverlay="true"
            :nestedGallery="true"
            :animationDelay="300"
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
    > h1 {
      font-size: 2rem;
      font-weight: 700;
    }
    .gallery--item__container {
      @include flex;
      margin: $verticalPadding * 3 / 4 0;
      .title__container {
        @include flex;
        h2 {
          font-size: 1.75rem;
          text-align: center;
        }
      }
      .photoGallery .photoGallery__container {
        padding-left: 0;
        padding-right: 0;
      }
    }
    @media (min-width: 768px) and (min-height: 500px) {
      > h1 {
        font-size: 2.25rem;
      }
      .gallery--item__container {
        .title__container h2 {
          font-size: 1.75rem;
        }
      }
    }
    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      padding-top: $verticalPadding * 4;
    }
    @media (min-width: 1024px) and (min-height: 500px) {
      > h1 {
        font-size: 3rem;
      }
      .gallery--item__container {
        .title__container h2 {
          font-size: 2.25rem;
        }
      }
    }
    @media (min-width: 1650px) and (min-height: 500px) {
      .gallery--item__container {
        .title__container h2 {
          font-size: 2.5rem;
        }
      }
    }
  }
}
</style>
