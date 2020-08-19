<template>
  <section class="photoGallery">
    <div class="photoGallery__container">
      <LightGallery
        :images="images"
        :index="index"
        :disable-scroll="true"
        @close="index = null"
        v-if="zoomedPhotos"
      />
      <div class="grid">
        <div
          class="image__container"
          v-for="(item, i) in images"
          :key="i"
          @click="
            index = i;
            pushRoute(item);
          "
          data-aos="fade-up"
          data-aos-easing="ease-in-out-quad"
          data-aos-duration="800"
          :data-aos-delay="animationDelay + i * 100"
        >
          <img
            :src="item.frontImage.fields.file.url"
            :alt="item.frontImage.fields.file.title"
            class="image"
            v-if="!displayImageOnly"
          />
          <img
            :src="item.url"
            :alt="item.title"
            class="image"
            v-else-if="item.url"
          />
          <img :src="item.url" :alt="item" class="image" v-else />
          <div
            class="image__description_layer"
            :class="{ light: displayImageOnly && !displayOverlay }"
          >
            <div
              class="description__container"
              v-if="!displayImageOnly || displayOverlay"
            >
              <h1>{{ item.title }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { LightGallery } from "vue-light-gallery";

interface Image {
  fields: {
    file: {
      url: string;
    };
  };
}

@Component({
  components: { LightGallery }
})
export default class PhotoGallery extends Vue {
  @Prop({ required: true }) images!: string[];
  @Prop() routeComponentName!: string;
  @Prop({ default: false, required: true }) displayImageOnly!: boolean;
  @Prop({ default: false, required: true }) zoomedPhotos!: boolean;
  @Prop({ default: false, required: true }) displayOverlay!: boolean;
  @Prop({ default: false }) nestedGallery!: boolean;
  @Prop({
    default: 200,
    required: false,
    validator: value => value >= 0 && value <= 1000
  })
  animationDelay!: number;

  index = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pushRoute(item: any) {
    if (!this.$props.displayImageOnly) {
      this.$router.push({
        name: this.$props.routeComponentName,
        params: { name: item.slug, passedItem: item }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.photoGallery {
  width: 100%;
  .photoGallery__container {
    padding: $verticalPadding $horizontalPadding / 4;
    overflow: hidden;
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
      grid-auto-rows: 1fr;
      grid-gap: 3vh;
      // &::before {
      //   content: "";
      //   width: 0;
      //   padding-bottom: 100%;
      //   grid-row: 1 / 1;
      //   grid-column: 1 / 1;
      // }

      // > *:first-child {
      //   grid-row: 1 / 1;
      //   grid-column: 1 / 1;
      // }
    }
    .image__container {
      @include flex;
      flex-direction: row;
      align-items: flex-end;
      width: 100%;
      height: 100%;
      position: relative;
      &:hover {
        cursor: pointer;
      }
      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #fff;
      }
      .image__description_layer {
        position: absolute;
        // top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(10, 13, 26, 0.6);
        color: #fff;
        // visibility: hidden;
        // opacity: 0;
        @include flex;
        flex-direction: row;
        transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1),
          visibility 0.8s cubic-bezier(0.65, 0, 0.35, 1);
        top: initial;
        height: 20%;
        &.light {
          background: transparent;
        }
      }

      .description__container {
        transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        max-height: 100%;
        @include flex;
        // padding: 4vmin;
        text-align: center;
        h1 {
          font-size: 1rem;
          text-transform: capitalize;
        }
        p {
          font-size: 0.875rem;
          line-height: 1.75;
        }
      }
    }
    @media (min-width: 360px) {
      .image__container .description__container {
        h1 {
          font-size: 1.25rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
      }
    }
    @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
      .image__container {
        .image__description_layer {
          opacity: 0;
          visibility: hidden;
          top: 0;
          height: auto;
          align-items: flex-end;
        }
        &:hover .image__description_layer {
          visibility: visible;
          opacity: 1;
        }

        &:hover .description__container {
          transform: translateY(0);
        }
        .description__container {
          display: block;
          font-size: 1.25rem;
          transform: translateY(1em);
          padding: 4vmin;
          h1 {
            margin-bottom: 2vh;
          }
        }
      }
    }
    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      .image__container .description__container {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.875rem;
        }
      }
      .grid {
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
      }
    }
    @media (min-width: 1024px) {
      padding: $verticalPadding $horizontalPadding / 2;
      .grid {
        grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
      }
    }
    @media screen and (min-width: 1024px) and (min-height: 1023px) and (max-height: 1024px) and (orientation: landscape) {
      .grid {
        grid-template-columns: repeat(2, minmax(14rem, 1fr));
      }
      .image__container .description__container {
        h1 {
          font-size: 1.25rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
    @media (min-width: 1024px) and (min-height: 1366px) {
      .grid {
        grid-template-columns: repeat(2, minmax(14rem, 1fr));
      }
      .image__container .description__container {
        h1 {
          font-size: 1.25rem;
        }
        p {
          font-size: 1rem;
        }
      }
    }
  }
  @media (min-width: 1024px) {
    &.col-3 .photoGallery__container .grid {
      grid-template-columns: repeat(4, minmax(14rem, 1fr));
    }
  }
}
.light-gallery
  .light-gallery__modal
  .light-gallery__container
  .light-gallery__content
  .light-gallery__image-container
  .light-gallery__image
  .light-gallery__text {
  text-transform: capitalize;
}
</style>
