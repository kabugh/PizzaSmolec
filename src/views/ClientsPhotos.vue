<template>
  <section class="clientsPhotos">
    <div class="clientsPhotos__container">
      <div class="description__container">
        <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          Podziel się wizytą i wygraj darmową pizzę na koniec miesiąca.
        </h1>
        <p>
          Wystarczy, ze opublikujesz post na instagramie prezentujący twoją
          wizytę w Pizza Smolec, a następnie podasz link ponizej. Na koniec
          miesiąca masz szansę na wylosowanie darmowej pizzy!
        </p>
        <form
          action=""
          @submit.prevent=""
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <div class="input__container">
            <input
              type="text"
              v-model.trim="url"
              placeholder="Link do postu na instagramie"
              :disabled="disableInputs"
              autocomplete="off"
              @blur="$v.url.$touch()"
              :class="{ 'form--error': $v.url.$error }"
            />
            <span class="error" v-if="!$v.url.required && $v.url.$error">
              Proszę podać link do postu na instagramie.
            </span>
            <span class="error" v-else-if="!$v.url.url && $v.url.$error">
              Proszę podać poprawny link ('https://').
            </span>
          </div>
          <button
            type="submit"
            :disabled="disableInputs || $v.$invalid"
            :class="{ loading: disableInputs }"
            class="dark"
          >
            Wyślij
          </button>
        </form>
      </div>
      <div class="posts__container">
        <InstagramEmbed
          v-for="(post, index) in visiblePosts"
          :url="post.link"
          :key="index"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InstagramEmbed from "vue-instagram-embed";
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";
import { InstagramPost } from "@/utils/interfaces/Posts";

@Component({
  components: { InstagramEmbed },
  mixins: [validationMixin],
  validations: {
    url: {
      required,
      url
    }
  }
})
export default class ClientsPhotos extends Vue {
  created() {
    this.overlayLoading = false;
  }

  url = "";
  disableInputs = false;

  get posts(): InstagramPost[] {
    return this.$store.getters.posts;
  }

  get visiblePosts(): InstagramPost[] {
    return this.posts.filter(post => post.accepted);
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
.clientsPhotos {
  width: 100%;
  color: black;
  min-height: 70vh;
  .clientsPhotos__container {
    padding: $verticalPadding * 3 $horizontalPadding / 2 $verticalPadding
      $horizontalPadding / 2;
    @include flex;
    .description__container {
      padding: 0 $horizontalPadding;
      > h1 {
        font-size: 1.75rem;
        font-weight: 700;
      }
      form {
        width: 100%;
        padding: $verticalPadding / 2 0;
        row-gap: $verticalPadding / 3 * 2;
        margin: 0 auto;
        > .input__container input {
          &:disabled {
            color: $brandColor;
          }
          &.form--error {
            border-color: $error;
            color: $error;
          }
        }
        span.error {
          transition: all 0.5s ease-in-out;
          color: $error;
          font-size: 0.875rem;
        }
        button {
          margin-top: 1vh;
          display: inline-block;
          color: $brandColor;
          font-weight: bold;
          border-color: $brandColor;
          transition: all 0.3s ease-in-out;
          &:hover {
            background-color: $brandColor;
            color: white;
          }
          &:disabled {
            color: $disabled;
            border-color: $disabled;
            cursor: progress;
            &:hover {
              color: $disabled;
              background-color: white;
              border-color: $disabled;
            }
          }
          @media (max-width: 360px) {
            padding: 8px 20px;
          }
        }
      }
      .posts__container {
        width: 80%;
        margin: $verticalPadding * 2 auto;
        display: grid;
        align-items: center;
        justify-items: center;
        grid-template-columns: repeat(3, 1fr);
        column-gap: $verticalPadding;
        row-gap: $verticalPadding;
      }
    }
  }
}
</style>
