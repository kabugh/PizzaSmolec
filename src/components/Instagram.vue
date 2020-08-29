<template>
  <section class="instagram">
    <div class="instagram__container">
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        class="grid"
        id="instafeed"
      ></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
import Instafeed from "instafeed.js";

@Component
export default class Instagram extends Vue {
  async created() {
    const userId = process.env.VUE_APP_userId;
    const userSecret = process.env.VUE_APP_userSecret;
    const url = `https://ig.instant-tokens.com/users/2d128920-0d65-41f8-bad5-9f0db2b2bb76/instagram/${userId}/token?userSecret=${userSecret}`;
    let token = "";
    await axios
      .get(url)
      .then(response => (token = response.data.Token))
      .catch(e => console.log(e));
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const feed = new Instafeed({
      accessToken: token,
      limit: 4,
      template:
        '<a href="{{link}}" aria-label="instagram" class="post" target="_blank"><img class="image" alt="{{caption}}" src="{{image}}" /></a>'
      // template:
      // '<a href="{{link}}" target="_blank" class="post"><img class="image" src="{{image}} /></a>'
    });
    feed.run();
  }
  images = [];
  restuctureData(data: any) {
    this.images = data.data.slice(0, 4).map((obj: any) => ({
      mediaUrl: obj.media_url,
      permalink: obj.permalink
    }));
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.instagram {
  width: 100%;
  min-height: 50vh;
  .instagram__container {
    padding: $verticalPadding $horizontalPadding / 4;
    #instafeed {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
      grid-auto-rows: 1fr;
      grid-gap: 3vh;
      &::before {
        content: "";
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }
      > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
      }
      a {
        img {
          width: 100%;
          height: 100%;
          transition: all 0.15s ease-in-out;
          object-fit: cover;
        }
      }
      .post:hover .image {
        transition: all 0.5s ease-in-out;
        -webkit-transform: scale(1.03) translate3d(0, 0, 0);
        transform: scale(1.03) translate3d(0, 0, 0);
      }
    }
    @media (min-width: 768px) {
      #instafeed {
        grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
      }
    }
    @media (min-width: 1024px) {
      padding: $verticalPadding $horizontalPadding / 2;
      #instafeed {
        grid-template-columns: repeat(4, minmax(10rem, 1fr));
      }
    }
    @media screen and (min-width: 1024px) and (min-height: 1023px) and (max-height: 1024px) and (orientation: landscape) {
      #instafeed {
        grid-template-columns: repeat(2, minmax(12rem, 1fr));
      }
    }
    @media (min-width: 1024px) and (min-height: 1366px) {
      #instafeed {
        grid-template-columns: repeat(2, minmax(12rem, 1fr));
      }
    }
  }
}
</style>
