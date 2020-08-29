<template>
  <section class="home">
    <Hero />
    <transition name="fade" appear>
      <YoutubePlayer v-if="videoModal" />
    </transition>
    <section class="introduction">
      <div class="introduction__container">
        <div class="introduction__item greeting">
          <div class="image__wrapper">
            <img
              src="@/assets/images/dough.jpg"
              alt="item.image"
              class="unselectable"
            />
          </div>
          <div class="description__container">
            <div class="description__wrapper">
              <h1>
                Witaj w Pizza Smolec - Tenis Planet!
              </h1>
              <h2>Na jaką pizzę masz dzisiaj ochotę?</h2>
              <p>Zajrzyj na nasze social media i bądź na bieżąco.</p>
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
          </div>
        </div>
        <div class="introduction__item" v-if="pizzaOfTheMonth.image">
          <div class="image__wrapper pizzaItem">
            <img
              :src="pizzaOfTheMonth.image.fields.file.url"
              alt="item.image"
              class="unselectable"
            />
          </div>
          <div class="description__container pizzaOfTheMonth">
            <div class="description__wrapper">
              <h1>{{ pizzaOfTheMonth.name }}</h1>
              <p>
                {{ pizzaOfTheMonth.description }}
              </p>
              <div class="button__container">
                <div class="price__tag">{{ pizzaOfTheMonth.price }} zł</div>
                <button type="button" @click="$router.push('/menu')">
                  Zamów teraz
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="introduction__item"
          v-for="(item, index) in introductionItems"
          :key="index"
        >
          <div
            class="description__container"
            :style="{ backgroundColor: item.backgroundColor }"
            :class="item.name"
          >
            <div class="description__wrapper">
              <h1>{{ item.title }}</h1>
              <h2>{{ item.subTitle }}</h2>
              <p v-for="(paragraph, i) in item.paragraphs" :key="i">
                {{ paragraph }}
              </p>
            </div>
          </div>
          <div class="image__wrapper" :class="item.name">
            <img
              :src="require(`@/assets/images/${item.image}`)"
              alt="item.image"
              class="unselectable"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hero from "@/components/Hero.vue";
import YoutubePlayer from "@/components/YoutubePlayer.vue";

interface IntroductionItem {
  name: string;
  title: string;
  subTitle: string;
  paragraphs: string[];
  image: string;
  backgroundColor: string;
}

@Component({
  components: { Hero, YoutubePlayer }
})
export default class Home extends Vue {
  async created() {
    await this.$store.dispatch("fetchPizzaOfTheMonth");
    this.overlayLoading = false;
  }

  socialsItems = [
    {
      icon: "ig_black.png",
      link: "https://www.instagram.com/tenis_planet/"
    },
    {
      icon: "fb_black.png",
      link: "https://www.facebook.com/tenisplanetsmolec/"
    },
    {
      icon: "yt_black.png",
      link: "https://www.youtube.com/channel/UCKD_wDLcAK9FTLmjDOAyHhQ"
    }
  ];

  introductionItems: IntroductionItem[] = [
    {
      name: "introduction",
      title: "Witaj w naszej restauracji",
      subTitle:
        "tu gdzie łączymy pasję z rodzinną atmosferą i pysznym smakiem!",
      paragraphs: [
        "Naszą misją jest, aby każdy czuł się jak u siebie w domu. Rodzina odgrywa niezwykle istotną rolę w życiu każdego człowieka. To wśród najbliższych nabywamy podstawową wiedzę i umiejętności niezbędne do funkcjonowania w rzeczywistości społecznej.",
        "Rodzice i krewni stają się przykładem dla dzieci, które, jak wiadomo nie od dziś, najszybciej uczą się poprzez obserwację i naśladownictwo dorosłych."
      ],
      image: "slide1.jpg",
      backgroundColor: "white"
    },
    {
      name: "location",
      title: "Nasze menu na miejscu",
      subTitle: "Pozwól ugościć się naszym kucharzom.",
      paragraphs: [
        "Tradycyjne receptury, przekazywane z pokolenia na pokolenie, staranny dobór składników i kadra kucharzy z pasją, pozwalają częstować naszych klientów daniami o wspaniałym smaku.",
        "Zapraszamy do zamawiania naszej pizzy w dostawie, a w ofercie stacjonarnej również menu śniadań, lunchy i orzeźwiających selekcjonowanych piw."
      ],
      image: "slide2.jpg",
      backgroundColor: "black"
    },
    {
      name: "delivery",
      title: "Nasze menu na dowóz",
      subTitle: "Poznaj nasze smaki i zostań z nami na stałe.",
      paragraphs: [
        "Z poszanowaniem dla Państwa, w naszym menu na dowóz, które proponujemy Państwu, poza pizzą znalazły się tylko wyselekcjonowane dania, które jesteśmy Państwu dostarczyć w tak krótkim czasie aby nie utraciły one swojego smaku i aromatu. Nie zależy nam na ilości sprzedanych „placków” pizzy, makaronów czy innych dań. Dla nas najważniejsza jest jakość i Państwa zadowolenie. Nasi kucharze i pizzaiolo są specjalistami w swym fachu i chcemy aby ich praca nie szła na marne. Mamy nadzieję, że będziecie mogli docenić ich kunszt.",
        "Ze swojej strony prosimy o wyrozumiałość w sytuacjach losowych, gdyż na pewne jak  korki czy inne zdarzenia drogowe nie mamy wpływu.",
        "Jednak prosimy pamiętać iż żadna potrawa w dostawie nie będzie tak smakować jak ta podana na miejscu. Zapraszamy więc serdecznie."
      ],
      image: "slide3.jpg",
      backgroundColor: "#cbba9e"
    }
  ];

  get pizzaOfTheMonth() {
    return this.$store.getters.pizzaOfTheMonth;
  }

  set pizzaOfTheMonth(value) {
    this.$store.commit("setPizzaOfTheMonth", value);
  }

  get loading() {
    return this.$store.getters.loading;
  }

  get overlayLoading() {
    return this.$store.getters.overlayLoading;
  }

  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
  }

  get videoModal() {
    return this.$store.getters.videoModal;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.home {
  width: 100%;
  .introduction {
    width: 100%;
    overflow: hidden;
    .introduction__container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      align-items: center;
      justify-content: center;
      .introduction__item {
        width: 100%;
        min-height: 30vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0.4fr auto;
        justify-content: center;
        align-items: center;
        .description__container {
          width: 100%;
          height: 100%;
          color: black;
          background-color: white;
          @include flex;
          flex-direction: row;

          .description__wrapper {
            flex-direction: column;
            padding: $verticalPadding / 2 $horizontalPadding / 2;
            h1 {
              font-size: 1.5rem;
              font-weight: 700;
            }
            h2 {
              margin: 2vh 0;
              font-size: 1rem;
            }
            p {
              color: #414141;
              font-size: 0.875rem;
              margin: 1vh 0;
            }
            .button__container {
              @include flex;
              justify-content: flex-start;
              flex-direction: row;
              margin-top: $verticalPadding / 2;
              .price__tag {
                background-color: $invertedColor;
                color: $brandColor;
                padding: 14px 10px;
                text-align: center;
                font-weight: 700;
              }
              button {
                background-color: $mainColor;
                color: $secondaryColor;
                border: none;
                &:hover {
                  background-color: black;
                  color: white;
                }
              }
            }
            .socials__container {
              @include flex;
              flex-direction: row;
              margin-top: $verticalPadding / 2;
              > a {
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                padding: 1vh;
                transition: background-color 0.2s linear 0s;
                margin: 0 10px;
                &:hover {
                  background-color: rgba(0, 0, 0, 0.1);
                }
                &:first-of-type {
                  margin-left: -1vh;
                }
                &:last-of-type {
                  margin-right: -1vh;
                }

                img {
                  width: 24px;
                  height: 24px;
                }
              }
            }
          }
          &.location {
            color: white;
            .description__wrapper p {
              color: white;
            }
          }
          &.pizzaOfTheMonth {
            background-color: #575757;
            color: white;
            p {
              color: white;
            }
          }
        }
        &.greeting .description__container {
          text-align: center;
        }
        .image__wrapper {
          grid-row: 1;
          width: 100%;
          height: 100%;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
  @media (min-width: 360px) and (min-height: 650px) {
    .introduction .introduction__container .introduction__item {
      .description__container {
        .description__wrapper {
          padding-top: $verticalPadding * 3 / 4;
          padding-bottom: $verticalPadding * 3 / 4;
        }
      }
    }
  }
  @media (min-width: 450px) and (min-height: 500px) {
  }
  @media (min-width: 768px) and (min-height: 500px) {
    .introduction .introduction__container .introduction__item {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
      height: auto;
      min-height: auto;
      &.greeting .description__container {
        text-align: inherit;
      }
      &:nth-of-type(odd) {
        .description__container {
          grid-column: 1;
          .description__wrapper {
            .button__container,
            .socials__container {
              justify-content: flex-start;
            }
          }
        }
        text-align: left;
      }
      &:nth-of-type(even) {
        .description__container {
          grid-column: 2;
          .description__wrapper {
            .button__container,
            .socials__container {
              justify-content: flex-end;
            }
          }
        }
        text-align: right;
      }
      .description__container {
        grid-row: 1;
        .description__wrapper {
          padding: $verticalPadding * 3 / 4 $horizontalPadding / 2;
          h1 {
            font-size: 1.75rem;
          }
          h2 {
            font-size: 1.125rem;
          }
        }
      }
      .image__wrapper {
        grid-row: 1;
        &.pizzaItem {
          min-height: 45vh;
        }
      }
      &:not(.informative__item) {
        .image__wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: block;
          max-width: 50%;
        }
        // image gradients
        &:nth-of-type(odd) {
          .image__wrapper {
            &::after {
              background: rgb(255, 255, 255);
              background: -webkit-linear-gradient(
                270deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 100%
              );

              background: linear-gradient(
                270deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 100%
              );
            }
            &.pizzaItem::after {
              background-image: #575757;
              background: -webkit-linear-gradient(
                270deg,
                rgba(87, 87, 87, 1) 0%,
                rgba(255, 255, 255, 0) 20%
              );
              background: linear-gradient(
                270deg,
                rgba(87, 87, 87, 1) 0%,
                rgba(255, 255, 255, 0) 20%
              );
            }
            &.location::after {
              background: rgb(0, 0, 0);
              background: -webkit-linear-gradient(
                90deg,
                rgba(0, 0, 0, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            &.delivery::after {
              background: rgb(203, 186, 158);
              background: -webkit-linear-gradient(
                90deg,
                rgba(203, 186, 158, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              background: rgb(203, 186, 158);
              background: linear-gradient(
                90deg,
                rgba(203, 186, 158, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            }
          }
        }
        &:nth-of-type(even) {
          .image__wrapper {
            &::after {
              margin-left: auto;
              background: rgb(255, 255, 255);
              background: -webkit-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 100%
              );
              background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 1) 100%
              );
            }
            &.pizzaItem::after {
              background: rgb(87, 87, 87);
              background: -webkit-linear-gradient(
                270deg,
                rgba(87, 87, 87, 1) 0%,
                rgba(255, 255, 255, 0) 20%
              );
              background: linear-gradient(
                270deg,
                rgba(87, 87, 87, 1) 0%,
                rgba(255, 255, 255, 0) 20%
              );
            }
            &.location::after {
              background: rgb(0, 0, 0);
              background: -webkit-linear-gradient(
                270deg,
                rgba(0, 0, 0, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              background: linear-gradient(
                270deg,
                rgba(0, 0, 0, 1) 0%,
                rgba(255, 255, 255, 0) 100%
              );
            }
            &.delivery::after {
              background: rgb(255, 255, 255);
              background: -webkit-linear-gradient(
                270deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(203, 186, 158, 1) 100%
              );
              background: linear-gradient(
                270deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(203, 186, 158, 1) 100%
              );
            }
          }
        }
      }
    }
  }
  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    .introduction .introduction__container .introduction__item {
      .description__container {
        .description__wrapper {
          padding-top: $verticalPadding;
          padding-bottom: $verticalPadding;
        }
      }
    }
  }
  @media (min-width: 1024px) and (min-height: 500px) {
    .introduction .introduction__container .introduction__item {
      .description__container {
        grid-row: 1;
        .description__wrapper {
          h1 {
            font-size: 2.25rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          p {
            font-size: 1rem;
          }
          .socials__container > a img {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
  @media (min-width: 1024px) and (min-height: 500px) and (max-height: 900px) {
  }
  @media (min-width: 1024px) and (min-height: 500px) and (hover: hover) and (pointer: fine) {
  }
  @media (min-width: 769px) and (min-height: 1050px) and (orientation: portrait) {
    .introduction .introduction__container .introduction__item {
      &:nth-of-type(even) .image__wrapper::after {
        margin-right: -2px;
      }
      &:nth-of-type(odd) .image__wrapper::after {
        margin-left: -2px;
      }
    }
  }
  @media (min-width: 1280px) and (min-height: 500px) {
    .greeting .greeting__container .greeting__content {
      h1 {
        font-size: 2.5rem;
      }
    }
    .introduction .introduction__container .introduction__item {
      grid-template-rows: minmax(20vh, auto);
      .description__container {
        .description__wrapper {
          padding: $verticalPadding / 2 $horizontalPadding / 2;
          h1 {
            font-size: 2.5rem;
          }
          h2 {
            font-size: 1.75rem;
          }
        }
      }
    }
  }
  @media (min-width: 1650px) and (min-height: 500px) {
    .introduction
      .introduction__container
      .introduction__item
      .description__container
      .description__wrapper {
      padding: $verticalPadding / 4 $horizontalPadding * 3 / 4;
      h1 {
        font-size: 2.75rem;
      }
      h2 {
        font-size: 2rem;
      }
      @media (max-height: 900px) {
        padding: $verticalPadding / 2 $horizontalPadding * 3 / 4;
        h1 {
          font-size: 2.75rem;
        }
      }
    }
  }
  @media (min-width: 1850px) and (min-height: 500px) {
    .introduction
      .introduction__container
      .introduction__item
      .description__container
      .description__wrapper {
      padding: $verticalPadding / 4 $horizontalPadding / 2;
      h1 {
        font-size: 3.5rem;
      }
      h2 {
        font-size: 2.25rem;
      }
      p {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
