<template>
  <section class="contact topView">
    <div class="contact__container container">
      <!-- <div class="contact__details"></div> -->
      <div class="form__container">
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
        <h1>Skontaktuj się z nami</h1>

        <form
          @submit.prevent=""
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <div class="input__container">
            <input
              type="text"
              v-model.trim="name"
              placeholder="Imię i nazwisko"
              :disabled="disableInputs"
              autocomplete="off"
              @blur="$v.name.$touch()"
              :class="{ 'form--error': $v.name.$error }"
            />
            <span class="error" v-if="!$v.name.required && $v.name.$error">
              Proszę podać imię i nazwisko.
            </span>
          </div>
          <div class="input__container">
            <input
              type="text"
              v-model.trim="email"
              placeholder="Adres email"
              :disabled="disableInputs"
              autocomplete="off"
              @blur="$v.email.$touch()"
              :class="{ 'form--error': $v.email.$error }"
            />
            <span class="error" v-if="!$v.email.required && $v.email.$error">
              Proszę podać adres email.
            </span>
            <span class="error" v-if="!$v.email.email && $v.email.$error">
              Proszę podać poprawny adres email.
            </span>
          </div>
          <div class="input__container">
            <input
              type="text"
              v-model.trim="phone"
              placeholder="Numer telefonu"
              :disabled="disableInputs"
              autocomplete="off"
              @blur="$v.phone.$touch()"
              :class="{ 'form--error': $v.phone.$error }"
            />
            <span class="error" v-if="!$v.phone.required && $v.phone.$error">
              Proszę podać numer telefonu.
            </span>
            <span
              class="error"
              v-if="$v.phone.required && !$v.phone.phone && $v.phone.$error"
            >
              Proszę podać poprawny numer telefonu.
            </span>
          </div>
          <div class="input__container">
            <textarea
              v-model.trim="message"
              placeholder="Treść wiadomości"
              :disabled="disableInputs"
              autocomplete="off"
              @blur="$v.message.$touch()"
              :class="{ 'form--error': $v.message.$error }"
            ></textarea>
            <span
              class="error"
              v-if="!$v.message.required && $v.message.$error"
            >
              Proszę podać wiadomość.
            </span>
            <span class="error" v-if="!$v.message.maxLength">
              Wiadomość nie powinna być dłuższa niż
              {{ $v.message.$params.maxLength.max }} znaków.
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
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, email, maxLength } from "vuelidate/lib/validators";
import phone from "@/utils/phoneValidation";

@Component({
  mixins: [validationMixin],
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      phone
    },
    message: {
      required,
      maxLength: maxLength(500)
    }
  }
})
export default class Contact extends Vue {
  name = "";
  email = "";
  phone = "";
  message = "";

  disableInputs = false;

  mounted() {
    this.overlayLoading = false;
  }

  clearForm() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.message = "";
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

.contact {
  width: 100%;
  color: black;
  .contact__container {
    @include flex;
    margin: 0 auto;
    width: 100%;
    padding-left: $horizontalPadding;
    padding-right: $horizontalPadding;
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
    }
    .form__container {
      width: 100%;
      @include flex;

      form {
        width: 100%;
        padding: $verticalPadding / 2 0;
        row-gap: $verticalPadding / 3 * 2;
        > .input__container input,
        > .input__container textarea {
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
          font-size: 0.7rem;
        }

        button {
          margin-top: 3vh;
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

        @media (min-width: 360px) {
          span.error {
            font-size: 1rem;
          }
          button {
            margin-top: 4vh;
          }
        }
      }
    }
  }
}
@media (min-width: 768px) and (min-height: 500px) {
  .delivery .delivery__container {
    h1 {
      font-size: 2rem;
    }
  }
}
@media (min-width: 1024px) and (min-height: 500px) {
}
@media (min-width: 1024px) and (min-height: 500px) and (max-height: 900px) {
}
@media (min-width: 1280px) and (min-height: 500px) {
}
@media (min-width: 1650px) and (min-height: 500px) {
}
</style>
