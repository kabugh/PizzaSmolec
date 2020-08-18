<template>
  <section class="home">
    <Hero />
    <section class="introduction">
      <div class="introduction__container">
        <div
          class="introduction__item informative__item"
          v-if="pizzaOfTheMonth.image"
        >
          <div class="image__wrapper">
            <img
              :src="pizzaOfTheMonth.image.fields.file.url"
              alt="item.image"
              class="unselectable"
            />
          </div>
          <div
            class="description__container subItem__container pizzaOfTheMonth"
          >
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
          <div class="description__container">
            <div class="description__wrapper">
              <h1>{{ item.title }}</h1>
              <h2>{{ item.subTitle }}</h2>
              <p v-for="(paragraph, i) in item.paragraphs" :key="i">
                {{ paragraph }}
              </p>
            </div>
          </div>
          <div class="image__wrapper">
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

interface IntroductionItem {
  title: string;
  subTitle: string;
  paragraphs: string[];
  image: string;
}

@Component({
  components: { Hero }
})
export default class Home extends Vue {
  async created() {
    await this.$store.dispatch("fetchPizzaOfTheMonth");
    this.overlayLoading = false;
  }

  get pizzaOfTheMonth() {
    return this.$store.getters.pizzaOfTheMonth;
  }

  set pizzaOfTheMonth(value) {
    this.$store.commit("setPizzaOfTheMonth", value);
  }

  get loading() {
    return this.$store.getters.loading;
  }

  introductionItems: IntroductionItem[] = [
    {
      title: "Witaj w naszej restauracji",
      subTitle:
        "tu gdzie łączymy pasję z rodzinną atmosferą i pysznym smakiem!",
      paragraphs: [
        "Naszą misją jest, aby każdy czuł się jak u siebie w domu. Rodzina odgrywa niezwykle istotną rolę w życiu każdego człowieka. To wśród najbliższych nabywamy podstawową wiedzę i umiejętności niezbędne do funkcjonowania w rzeczywistości społecznej.",
        "Rodzice i krewni stają się przykładem dla dzieci, które, jak wiadomo nie od dziś, najszybciej uczą się poprzez obserwację i naśladownictwo dorosłych."
      ],
      image: "slide1.jpg"
    },
    {
      title: "Nasze menu na miejscu",
      subTitle: "Pozwól ugościć się naszym kucharzom.",
      paragraphs: [
        "Tradycyjne receptury, przekazywane z pokolenia na pokolenie, staranny dobór składników i kadra kucharzy z pasją, pozwalają częstować naszych klientów daniami o wspaniałym smaku.",
        "Zapraszamy do zamawiania naszej pizzy w dostawie, a w ofercie stacjonarnej również menu śniadań, lunchy i orzeźwiających selekcjonowanych piw."
      ],
      image: "slide2.jpg"
    },
    {
      title: "Nasze menu na dowóz",
      subTitle: "Poznaj nasze smaki i zostań z nami na stałe.",
      paragraphs: [
        "Tradycyjne receptury, przekazywane z pokolenia na pokolenie, staranny dobór składników i kadra kucharzy z pasją, pozwalającą częstować naszych klientów daniami o wspaniałym smaku.",
        "Zapraszamy do zamawiania naszej pizzy w dostawie, a w ofercie stacjonarnej również menu śniadań, lunchy i orzeźwiających selekcjonowanych piw."
      ],
      image: "slide3.jpg"
    }
  ];
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
.home {
  width: 100%;
  .introduction {
    width: 100%;
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
          min-height: 30vh;
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
      &:not(.informative__item):nth-of-type(even) {
        .description__container {
          grid-column: 1;
        }
        text-align: left;
      }
      &:not(.informative__item):nth-of-type(odd) {
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
        // image gradients
        // &:nth-of-type(even) {
        //   .image__wrapper {
        //     &::after {
        //       background: linear-gradient(
        //         270deg,
        //         rgba(201, 215, 231, 0),
        //         rgba(201, 215, 231, 0) 70%,
        //         rgba(201, 215, 231, 0.96) 95%,
        //         white
        //       );
        //     }
        //   }
        // }
        // &:nth-of-type(odd) {
        //   .image__wrapper {
        //     &::after {
        //       background: linear-gradient(
        //         90deg,
        //         rgba(201, 215, 231, 0),
        //         rgba(201, 215, 231, 0) 70%,
        //         rgba(201, 215, 231, 0.96) 95%,
        //         white
        //       );
        //     }
        //   }
        // }
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
        }
      }
    }
  }
  @media (min-width: 1024px) and (min-height: 500px) and (max-height: 900px) {
  }
  @media (min-width: 1024px) and (min-height: 500px) and (hover: hover) and (pointer: fine) {
  }
  @media (min-width: 1280px) and (min-height: 500px) {
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
