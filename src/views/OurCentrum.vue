<template>
  <section class="ourCentrum">
    <div class="ourCentrum__container">
      <div
        class="ourCentrum__item"
        v-for="(item, index) in ourCentrumItems"
        :key="index"
      >
        <div class="description__container">
          <div class="description__wrapper">
            <h1 data-aos="fade-up" data-aos-duration="800">{{ item.title }}</h1>
            <h2 data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              {{ item.subTitle }}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-duration="800"
              :data-aos-delay="150 + i * 50"
              v-for="(paragraph, i) in item.paragraphs"
              :key="i"
            >
              {{ paragraph }}
            </p>
            <a
              v-if="item.link"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="700"
              class="outsideLink"
              :href="item.link"
              target="_blank"
            >
              Sprawdź nasze korty na wirtualnym spacerze w Google Maps.
            </a>
          </div>
        </div>
        <div class="image__wrapper">
          <img
            :src="require(`@/assets/images/centrum/${item.image}`)"
            alt="item.image"
            class="unselectable"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface CentrumItem {
  title: string;
  subTitle?: string;
  paragraphs: string[];
  image: string;
  link?: string;
}

@Component
export default class OurCentrum extends Vue {
  mounted() {
    this.overlayLoading = false;
  }
  get overlayLoading() {
    return this.$store.getters.overlayLoading;
  }
  set overlayLoading(value) {
    this.$store.commit("setOverlayLoading", value);
  }
  ourCentrumItems: CentrumItem[] = [
    {
      title: "Witaj w Tenis Planet",
      subTitle:
        "tu gdzie łączymy sport z rodzinną atmosfera i pysznym smakiem!",
      paragraphs: [
        "Naszą misją jest, aby każdy czuł się jak u siebie w domu. Rodzina odgrywa niezwykle istotną rolę w życiu każdego człowieka. To wśród najbliższych nabywamy podstawową wiedzę i umiejętności niezbędne do funkcjonowania w rzeczywistości społecznej.",
        "Rodzice i krewni stają się przykładem dla dzieci, które, jak wiadomo nie od dziś, najszybciej uczą się poprzez obserwację i naśladownictwo dorosłych."
      ],
      image: "centrum1.jpg",
      link:
        "https://www.google.com/maps/place/Tenis+Planet/@51.0843931,16.9024075,3a,75y,200h,90t/data=!3m8!1e1!3m6!1sAF1QipPH3XVAa5qKD2k_xu4oAggtiH4eWjSwXgK4QOGE!2e10!3e11!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipPH3XVAa5qKD2k_xu4oAggtiH4eWjSwXgK4QOGE%3Dw224-h298-k-no-pi-0-ya159.24-ro0-fo100!7i9460!8i4730!4m14!1m6!3m5!1s0x470fc0f9e919d151:0x48e8bf5522f9947f!2sPizza+Smolec!8m2!3d51.0841!4d16.9017899!3m6!1s0x470fc1cc75301bf3:0x9bb18effdd36944!8m2!3d51.0841951!4d16.9021956!14m1!1BCgIgARICCAI"
    },
    {
      title: "Tenis i inne sporty to nasza rodzinna pasja",
      paragraphs: [
        "Zapraszamy na nasz kameralny obiekt z rodzinną atmosferą. Nie chcemy się chwalić zawodnikami, trenerami. To są nieodłączne elementy każdego sportu. I każdy klub je ma. Bez nich by nie istniał.",
        "My chcemy się pochwalić... atmosferą. Obiekt prowadzimy całą rodziną, wspierani przez naszych współpracowników, którzy dla nas są także jak rodzina. Także i naszych klientów traktujemy jak rodzinę.",
        "Zapraszamy więc wszystkich z rodziny tenisowej na nasz obiekt. Miło nam będzie Was ugościć."
      ],
      image: "centrum2.jpg"
    },
    {
      title: "Sukcesy",
      paragraphs: [
        "Niezwykłe osiągnięcia oraz sukcesy sportowe bez wątpienia zależą w dużym stopniu od talentu oraz czasu jaki poświęcamy na treningi i ciągłe doskonalenie własnych umiejętności.",
        "Duże znaczenie także, wsparcie najbliższych. My chcemy Wam je dać."
      ],
      image: "centrum3.jpg"
    }
  ];
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";

.ourCentrum {
  width: 100%;
  .ourCentrum__container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
    .ourCentrum__item {
      width: 100%;
      min-height: 30vh;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 0.4fr auto;
      justify-content: center;
      align-items: center;
      overflow-y: hidden;
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
          p,
          a {
            color: #414141;
            font-size: 0.875rem;
            margin: 1vh 0;
            span {
              text-decoration: underline;
              &:hover {
                cursor: pointer;
                color: black;
              }
            }
          }
          a {
            font-size: 1rem;
          }
        }
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
      &.informative__item {
        text-align: left;
        .subItem__container {
          width: 100%;
          height: 100%;
          @include backgroundDefault;
          flex-direction: column;
          &.description__container {
            grid-column: auto;
          }
          &.pizzaOfTheMonth .description__wrapper .button__container {
            @include flex;
            justify-content: flex-start;
            flex-direction: row;
            .price__tag {
              background-color: $invertedColor;
              color: $brandColor;
              padding: 14px 10px;
              text-align: center;
              font-weight: 700;
            }
            button {
              background-color: $brandColor;
              border: none;
              &:hover {
                background-color: $secondaryColor;
                color: white;
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 360px) and (min-height: 650px) {
}
@media (min-width: 450px) and (min-height: 500px) {
}
@media (min-width: 768px) and (min-height: 500px) {
  .ourCentrum .ourCentrum__container .ourCentrum__item {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    height: auto;
    min-height: auto;
    &:not(.informative__item):nth-of-type(odd) {
      .description__container {
        grid-column: 1;
      }
      text-align: left;
    }
    &:not(.informative__item):nth-of-type(even) {
      .description__container {
        grid-column: 2;
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
      }
    }
  }
}
@media (min-width: 1024px) and (min-height: 500px) {
  .ourCentrum .ourCentrum__container .ourCentrum__item {
    .description__container {
      grid-row: 1;
      .description__wrapper {
        h1 {
          font-size: 2.25rem;
        }
        h2 {
          font-size: 1.5rem;
        }
        p,
        a {
          font-size: 1rem;
        }
        a {
          font-size: 1.125rem;
        }
      }
    }
  }
}
@media (min-width: 1024px) and (min-height: 500px) and (max-height: 900px) {
}
@media (min-width: 1024px) and (min-height: 500px) and (hover: hover) and (pointer: fine) {
}
@media (min-width: 1280px) and (min-height: 500px) {
  .ourCentrum .ourCentrum__container .ourCentrum__item {
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
      font-size: 3rem;
    }
    h2 {
      font-size: 2rem;
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
    p,
    a {
      font-size: 1.25rem;
    }
  }
}
</style>
