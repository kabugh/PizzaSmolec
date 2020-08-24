<template>
  <section class="clientsPhotos">
    <div class="clientsPhotos__container">
      <div class="description__container">
        <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          Podziel się wizytą w Pizza Smolec i wygraj darmową pizzę na koniec
          miesiąca.
        </h1>
        <p>
          Wystarczy, ze opublikujesz post na instagramie prezentujący twoją
          wizytę w Pizza Smolec, a następnie podasz link ponizej. Na koniec
          miesiąca masz szansę na wylosowanie
        </p>
        <input type="text" placeholder="link do postu na instagramie" />
      </div>
      <div class="posts__container">
        <InstagramEmbed
          v-for="(post, index) in posts"
          :url="post"
          :key="index"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InstagramEmbed from "vue-instagram-embed";

@Component({
  components: { InstagramEmbed }
})
export default class ClientsPhotos extends Vue {
  created() {
    this.overlayLoading = false;
  }

  posts = [
    "https://www.instagram.com/p/CEKQ23bBIRa/",
    "https://www.instagram.com/p/CEKQ23bBIRa/",
    "https://www.instagram.com/p/CEKQ23bBIRa/"
  ];
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
.clientsPhotos {
  width: 100%;
  color: black;
  min-height: 70vh;
  .clientsPhotos__container {
    padding: $verticalPadding * 2 $horizontalPadding / 2 $verticalPadding
      $horizontalPadding / 2;
    @include flex;
    > h1 {
      font-size: 1.75rem;
      font-weight: 700;
    }
    .posts__container {
      width: 80%;
      margin: $verticalPadding auto;
      display: grid;
      align-items: center;
      justify-items: center;
      grid-template-columns: repeat(3, 1fr);
      column-gap: $verticalPadding;
      row-gap: $verticalPadding;
    }
  }
}
</style>
