<template>
  <section class="admin">
    <div class="admin__container">
      <div class="posts__container">
        <div class="post" v-for="(post, index) in posts" :key="index">
          <a :href="post.link">{{ post.link }}</a>
          <button
            type="button"
            class="dark"
            @click="accept(post)"
            v-if="!post.accepted"
          >
            Zaakceptuj
          </button>
          <button type="button" class="dark" @click="remove(post)" v-else>
            Odrzuć
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { InstagramPost } from "@/utils/interfaces/Posts";

@Component
export default class Admin extends Vue {
  created() {
    this.overlayLoading = false;
  }

  get posts(): InstagramPost[] {
    return this.$store.getters.posts;
  }

  accept(post: InstagramPost) {
    this.$store.dispatch("acceptPost", post);
  }

  remove(post: InstagramPost) {
    this.$store.dispatch("removePost", post);
  }

  get overlayLoading(): boolean {
    return this.$store.getters.overlayLoading;
  }

  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
  }

  get loading(): boolean {
    return this.$store.getters.loading;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.admin {
  width: 100%;
  .admin__container {
    padding: $verticalPadding * 3 $horizontalPadding / 2 $verticalPadding
      $horizontalPadding / 2;
    @include flex;
  }
}
</style>
