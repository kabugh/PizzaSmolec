<template>
  <section class="login">
    <div class="login__container">
      <h1>Logowanie</h1>
      <div class="form__wrapper">
        <form
          action
          @submit.prevent="onSignIn"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <div class="input__container">
            <input
              type="text"
              v-model.trim="email"
              :disabled="disableInputs"
              placeholder="Email"
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
              type="password"
              v-model.trim="password"
              :disabled="disableInputs"
              placeholder="Hasło"
              autocomplete="off"
              @blur="$v.password.$touch()"
              :class="{ 'form--error': $v.password.$error }"
            />
            <span
              class="error"
              v-if="!$v.password.required && $v.password.$error"
            >
              Proszę podać hasło.
            </span>
            <span class="error" v-if="!$v.password.minLength">
              Hasło musi posiadać conajmniej
              {{ $v.password.$params.minLength.min }} znaków.
            </span>
          </div>
          <button
            type="submit"
            :disabled="disableInputs || $v.$invalid"
            :class="{ loading: disableInputs }"
          >
            zaloguj
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import { User } from "@/utils/interfaces/User";
@Component({
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  }
})
export default class Login extends Vue {
  email = "";
  password = "";
  get user(): User {
    return this.$store.getters.user;
  }

  get disableInputs() {
    return this.$store.state.loading;
  }

  set disableInputs(value) {
    this.$store.commit("setLoading", value);
  }

  onSignIn() {
    this.$store
      .dispatch("signUserIn", {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.email = "";
        this.password = "";
        this.$v.$reset();
      });
    this.disableInputs = true;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
$error: #c10015;
.login {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  .login__container {
    color: black;
    @include flex;
    border-radius: 2px;
    padding: $verticalPadding;
    margin: $verticalPadding / 8;
    position: relative;
    h1 {
      font-size: 1.5rem;
      text-transform: uppercase;
      font-weight: bold;
    }
    .form__wrapper {
      form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        > .input__container {
          display: flex;
          align-items: flex-start;
          flex-direction: column;

          > input {
            margin-top: 1vh;
            min-height: 5vh;
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
          @media (max-width: 360px) {
            padding: 8px 20px;
          }
        }
        @media (min-width: 360px) {
          span.error {
            font-size: 1rem;
          }
          .Password__strength-meter {
            margin-bottom: 10px;
          }
          button {
            margin-top: 4vh;
          }
        }
        @media (min-width: 500px) {
          > input {
            margin-top: 2vh;
          }
        }
      }
    }
  }
}
</style>
