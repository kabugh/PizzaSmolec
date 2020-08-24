<template>
  <section class="youtube" ref="overlay" @click="closeModal">
    <div class="youtube__container">
      <iframe
        style="width: 100%; max-width: 650px"
        width="1280"
        height="720"
        src="https://www.youtube-nocookie.com/embed/yapn5Em2ftE"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class YoutubePlayer extends Vue {
  videoId = "yapn5Em2ftE";
  closeModal() {
    this.videoModal = false;
    document.body.style.overflow = "auto";
  }

  get videoModal() {
    return this.$store.getters.videoModal;
  }

  set videoModal(value) {
    this.$store.commit("setVideoModal", value);
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/global.scss";
.youtube {
  position: fixed;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  .youtube__container {
    height: 100%;
    width: 100%;
    @include flex;
  }
}
</style>
