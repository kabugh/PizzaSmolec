<template>
  <section class="clientsPhotos">
    <div class="clientsPhotos__container">
      <div class="description__container">
        <h1 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
          Podziel się wizytą i wygraj darmową pizzę na koniec miesiąca.
        </h1>
        <p data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          Wystarczy, ze opublikujesz post na instagramie prezentujący twoją
          wizytę w Pizza Smolec, a następnie podasz link poniżej. Na koniec
          miesiąca masz szansę na wylosowanie darmowej pizzy! Informacje o
          aktualnym losowaniu znajdziesz na naszym facebooku.
        </p>
        <form
          @submit.prevent="addPost"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="250"
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
              Proszę podać link.
            </span>
            <span class="error" v-else-if="!$v.url.url && $v.url.$error">
              Proszę podać poprawny link.
            </span>
            <span class="error" v-else-if="!$v.url.instagram && $v.url.$error"
              >Proszę podać poprawny link ('https://www.instagram.com/p/{ID
              postu}').</span
            >
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
      <div class="posts__container" v-if="!loading && visiblePosts.length > 0">
        <InstagramEmbed
          v-for="(post, index) in visiblePosts"
          :url="post.link"
          :key="index"
          class="post"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="500"
        />
      </div>
      <LoadingComponent
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="500"
        v-else-if="loading"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoadingComponent from "@/components/LoadingComponent.vue";
import InstagramEmbed from "vue-instagram-embed";
import { validationMixin } from "vuelidate";
import { required, url } from "vuelidate/lib/validators";
import { InstagramPost } from "@/utils/interfaces/Posts";

const instagramRegex = /(https?:\/\/(www\.)?)?instagram\.com(\/p\/\w+\/?)/;
const instagram = (value: string) => instagramRegex.test(value);
@Component({
  components: { LoadingComponent, InstagramEmbed },
  mixins: [validationMixin],
  validations: {
    url: {
      required,
      url,
      instagram
    }
  }
})
export default class ClientsPhotos extends Vue {
  created() {
    this.$store.dispatch("getPosts");
    this.overlayLoading = false;
  }

  url = "";
  disableInputs = false;

  addPost() {
    this.$store
      .dispatch("addPost", { accepted: false, link: this.url })
      .then(() => {
        this.url = "";
        this.$v.$reset;
      });
  }

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
  overflow: hidden;
  .clientsPhotos__container {
    padding: $verticalPadding * 3 $horizontalPadding / 6 $verticalPadding
      $horizontalPadding / 6;
    @include flex;
    .description__container {
      padding: 0 $horizontalPadding / 3;
      text-align: center;
      @media (min-width: 1280px) {
        padding: 0 $horizontalPadding * 3 / 2;
      }
      @media (min-width: 1650px) {
        padding: 0 $horizontalPadding * 2;
      }
      > h1 {
        font-size: 1.75rem;
        font-weight: 700;
      }
      p {
        margin: $verticalPadding / 2 0;
      }
      form {
        width: 100%;
        padding: $verticalPadding / 2 0;
        row-gap: $verticalPadding / 3 * 2;
        margin: 0 auto;
        > .input__container {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          input {
            &:disabled {
              color: $brandColor;
            }
            &.form--error {
              border-color: $error;
              color: $error;
            }
          }
        }
        span.error {
          transition: all 0.5s ease-in-out;
          color: $error;
          font-size: 0.875rem;
          text-align: left;
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
    }
    .posts__container {
      max-width: 90%;
      margin: $verticalPadding auto;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      row-gap: $verticalPadding;
      column-gap: $horizontalPadding / 3;
      // @media (min-width: 768px) {
      //   grid-template-columns: repeat(2, 1fr);
      // }
      // @media (min-width: 1280px) {
      //   grid-template-columns: repeat(3, 1fr);
      // }
      // @media (min-width: 1650px) {
      //   grid-template-columns: repeat(4, 1fr);
      // }
      .post {
        iframe {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
    }
  }
}
</style>
