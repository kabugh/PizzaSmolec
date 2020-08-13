<template>
  <footer>
    <div class="footer__container">
      <div class="about__details">
        <div class="address__container">
          <h2>Lokalizacja</h2>
          <p>Tenis Planet Restauracja</p>
          <p>ul. Śliwkowa 134</p>
          <p>55-080 Smolec</p>
        </div>
        <div class="contact__container">
          <h2>Kontakt</h2>
          <a href="tel:0048510400616">+48 510 400 616</a>

          <a href="mailto:biuro@tenisplanet.pl" class="email"
            >biuro@tenisplanet.pl</a
          >
          <div class="socials__container">
            <a
              :href="item.link"
              v-for="item in socialsItems"
              :key="item.link"
              target="_blank"
            >
              <img
                :src="require(`@/assets/images/icons/${item.icon}`)"
                alt="icon"
                class="unselectable"
              />
            </a>
          </div>
        </div>
        <div class="brand__wrapper">
          <img
            src="@/assets/images/logo_white.png"
            alt="logo"
            class="unselectable"
          />
        </div>
      </div>
      <div class="footer__details">
        <div class="authors__container">
          <div class="logo__wrapper">
            <a href="http://goldenbird.pl" target="_blank">
              <img
                src="@/assets/images/goldenbird.png"
                alt="goldenbird"
                class="unselectable"
              />
            </a>
          </div>
          <a href="http://goldenbird.pl" target="_blank"
            >Projekt i utrzymanie: Goldenbird</a
          >
        </div>
        <div class="copyrights__container">
          <p>&copy; 2020 Copyright Pizza Smolec. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheFooter extends Vue {
  get socialsItems() {
    return this.$store.getters.socialsItems;
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/global.scss";

footer {
  width: 100%;
  background-color: $secondaryColor;
  .footer__container {
    @include flex;
    align-items: center;
    padding: $verticalPadding * 3 / 4 $horizontalPadding / 2;
    .about__details {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      row-gap: $verticalPadding / 2;
      margin-bottom: $verticalPadding;
      text-align: center;
      h2 {
        font-weight: 900;
        margin-bottom: 1.2vh;
      }
      p {
        color: #ffffff;
        white-space: nowrap;
        margin-bottom: 1vh;
      }
      a {
        margin-bottom: 1vh;
      }
      > div {
        display: flex;
        flex-direction: column;
        // display: grid;
        // row-gap: $verticalPadding / 8;
      }
      .contact__container {
        > a {
          line-height: 1.75;
          color: white;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
          &.email {
            color: $mainColor;
          }
        }
        .socials__container {
          @include flex;
          flex-direction: row;
          > a {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            padding: 1vh;
            transition: background-color 0.2s linear 0s;
            margin: 0 10px;
            &:hover {
              background-color: rgba(255, 255, 255, 0.1);
            }
            &:first-of-type {
              margin-left: 0;
            }
            &:last-of-type {
              margin-right: 0;
            }

            img {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
      .brand__wrapper {
        @include flex;
        justify-content: flex-end;
        max-width: 80%;
        max-height: 20vh;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .footer__details {
      width: 100%;
      @include flex;
      justify-content: space-between;
      text-align: center;
      .authors__container {
        @include flex;
        flex-direction: row;
        justify-content: flex-start;
        .logo__wrapper {
          margin-right: 8px;
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          &:hover {
            transform: scale(1.05);
          }
          img {
            width: 48px;
            height: 48px;
            object-fit: contain;
          }
        }
        a {
          color: white;
          font-size: 0.875rem;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  @media (min-width: 360px) {
    .footer__container .footer__details .authors__container a {
      font-size: 1rem;
    }
  }
  @media (min-width: 500px) and (min-height: 400px) {
    .footer__container .about__details {
      grid-template-columns: repeat(2, 1fr);
      .brand__wrapper {
        max-width: 100%;
        margin-left: auto;
        margin-right: 0;
        display: none;
      }
    }
  }
  @media (min-width: 768px) and (min-height: 500px) {
    .footer__container {
      align-items: flex-start;

      .about__details {
        grid-template-columns: repeat(2, 1fr) 2fr;
        column-gap: $horizontalPadding;
        text-align: left;
        .contact__container {
          .socials__container {
            justify-content: flex-start;
            &:first-of-type {
              margin-left: -1vh;
            }
          }
        }
        .brand__wrapper {
          grid-column: 3;
          display: block;
        }
      }
      .footer__details {
        flex-direction: row;
        text-align: left;
      }
    }
  }
  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    .footer__container {
      padding-top: $verticalPadding * 2;
      padding-bottom: $verticalPadding * 2;
      .about__details {
        row-gap: $verticalPadding;
        .brand__wrapper {
          max-width: 60%;
          max-height: 14vh;
          justify-content: center;
          img {
            max-width: 60%;
            max-height: 100%;
          }
        }
      }
    }
  }
}
</style>
