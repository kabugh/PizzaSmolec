<template>
  <section class="admin">
    <div class="admin__container">
      <transition name="fade" v-if="user">
        <div class="admin__content">
          <h2>Zarządanie widocznością postów na podstronie Klienci</h2>
          <div class="posts__container" v-if="posts.length > 0">
            <div class="post" v-for="(post, index) in posts" :key="index">
              <div
                class="badge"
                :style="{
                  backgroundColor: post.accepted ? '#16a085' : '#e74c3c'
                }"
              >
                {{ post.accepted ? "Widoczny" : "Do akceptacji" }}
              </div>
              <a :href="post.link" target="_blank">{{ post.link }}</a>
              <span>Wysłano: {{ post.submitDate | date }}</span>
              <button type="button" @click="accept(post)" v-if="!post.accepted">
                Zaakceptuj
              </button>
              <button type="button" @click="remove(post)" v-else>
                Usuń
              </button>
            </div>
          </div>
          <p v-else-if="!loading">Brak postów do wyświetlenia</p>
          <LoadingComponent v-else />
        </div>
      </transition>
      <transition name="fade" v-else>
        <Login />
      </transition>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { InstagramPost } from "@/utils/interfaces/Posts";
import { User } from "@/utils/interfaces/User";

import LoadingComponent from "@/components/LoadingComponent.vue";
import Login from "@/components/Login.vue";

@Component({
  components: { LoadingComponent, Login },
  filters: {
    date(value: Date) {
      return new Date(value).toLocaleString();
    }
  }
})
export default class Admin extends Vue {
  mounted() {
    this.$store.dispatch("getPosts");
    this.overlayLoading = false;
  }

  get user(): User {
    return this.$store.getters.user;
  }

  get posts(): InstagramPost[] {
    return this.$store.getters.posts;
  }

  accept(post: InstagramPost) {
    this.$store.dispatch("acceptPost", post.id);
  }

  remove(post: InstagramPost) {
    this.$store.dispatch("removePost", post.id);
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
  min-height: 90vh;
  .admin__container {
    padding: $verticalPadding * 3 $horizontalPadding / 2 $verticalPadding
      $horizontalPadding / 2;
    width: 100%;
    @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
      padding-top: $verticalPadding * 4;
    }
    @include flex;
    .admin__content {
      color: black;
      @include flex;
      width: 100%;
      text-align: center;
      > p {
        margin-top: $verticalPadding / 2;
      }
      .posts__container {
        width: 100%;
        margin: $verticalPadding 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(auto, 1fr));
        row-gap: $verticalPadding / 2;
        column-gap: $horizontalPadding / 4;

        /* Grid Fallback */
        display: flex;
        flex-wrap: wrap;

        /* Supports Grid */
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

        .post {
          @include flex;
          max-width: 100%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15),
            0 10px 10px rgba(0, 0, 0, 0.12);
          padding: $verticalPadding / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          position: relative;

          /* Flex Fallback */
          margin-left: 5px;
          margin-right: 5px;
          flex: 1 1 200px;
          .badge {
            display: block;
            position: absolute;
            background-color: gray;
            width: max-content;
            top: 20px;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 4px;
            font-size: 0.75rem;
            border-radius: 2px;
            color: white;
          }
          a {
            width: max-content;
            font-size: 0.75rem;
            color: $secondaryColor;
          }
          span {
            padding-top: $verticalPadding / 8;
          }
          button {
            padding: 0;
            color: black;
            text-transform: capitalize;
            border: none;
            margin-top: 2vh;
            @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
              margin-top: 6vh;
            }
            &:hover {
              text-decoration: underline;
            }
          }
        }
        @media (min-width: 380px) {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));

          .post a {
            font-size: 1rem;
          }
        }
        @supports (display: grid) {
          .post {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
