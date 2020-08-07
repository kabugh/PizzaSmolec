<template>
  <section class="ourQuality topView">
    <div class="ourQuality__container container">
      <img
        src="@/assets/images/introduction/pizza.jpg"
        alt=""
        class="illustration unselectable"
        loading="lazy"
        ref="image"
      />
      <div class="description__container">
        <div class="title__container" ref="title1">
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
          <h1>Nasza Jakość</h1>
        </div>
        <div class="description__wrapper" ref="content1">
          <h3>
            Dania przygotowujemy dla Państwa wkładając w to nasze serce,
            doświadczenie, pasję i tradycyjne receptury. Wykorzystujemy produkty
            najwyższej jakości, nie idziemy na skróty.
          </h3>
          <h3>
            Dodajemy świeże warzywa, najlepsze dodatki, tak aby produkt finalny
            był jak najwyższej jakości. Nie spieszymy się. Jakość a nie ilość
            jest dla nas najważniejsza.
          </h3>
        </div>
      </div>
      <div class="description__container">
        <div class="title__container" ref="title2">
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
          <h1>Kochamy Pizzę</h1>
        </div>
        <div class="description__wrapper" ref="content2">
          <h3>
            Nasze ciasto przygotowujemy tylko z włoskiej mąki, drożdży i wody.
            Leżakuje ono odpowiednio długo, aby było lekkie i chrupiące (nawet 4
            dni) Nasi pizzaiolo wkładają swój kunszt, pasję rozkręcając ciasto
            ręcznie . Nasz sos pomidorowy powstaje wyłącznie z pomidorów pelati,
            oliwy i przypraw. Nie stosujemy żadnych zamienników.
          </h3>
          <p>
            Jeśli włoska pizza to tylko włoskie składniki : sery: mozzarella,
            taleggio (włoski ser regionalny wytwarzany tylko w dolinie Bergamo),
            gorgonzola , czy też słynny parmezan najlepsze włoskie szynki i
            wędliny: wieprzowe Prosciutto Cotto (gotowana), Prosciutto Crudo
            (surowa ), wołowa wędlina Bresaola pochodząca z doliny Valtellina w
            Lombardii w północnym regionie Włoch, dojrzewająca (8-12 tygodni),
            włoskie salami : Salami Spianata - salami pikantne, czy salami
            Napoli – łagodne, włoski boczek Pancetta.
          </p>
          <p>
            Dzięki temu z każdym kolejnym kęsem czujemy wszystkie smaki dodatków
            i z każdym kolejnym kęsem czujemy się jak w słonecznej Italii. W
            każdej naszej pizzy czuć pasję . Nie piszemy, że nasza pizza jest
            Premium. Ona jest po prostu prawdziwa.
          </p>
          <h2>Spróbuj i Ty. Obiecujemy, że się nie zawiedziesz 🍕</h2>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TimelineLite } from "gsap";

@Component
export default class OurQuality extends Vue {
  overlayDelay = false;

  mounted() {
    this.overlayDelay = false;
    this.overlayLoading = false;
    this.startAnimation(this.overlayDelay);
  }

  startAnimation(overlayDelay: boolean) {
    const image = this.$refs.image;
    const overlay = this.$refs.overlay;
    const title1 = this.$refs.title1;
    const content1 = this.$refs.content1;
    const title2 = this.$refs.title2;
    const content2 = this.$refs.content2;
    const timeline1 = new TimelineLite();
    const timeline2 = new TimelineLite();
    const initialDelay = overlayDelay ? 1.5 : 0;
    timeline1.from(overlay, {
      duration: 1.5,
      opacity: 0,
      ease: "power4",
      y: -50,
      delay: initialDelay
    });
    timeline2
      .from(image, {
        duration: 2.5,
        delay: 1 + initialDelay,
        opacity: 0,
        ease: "power4",
        y: -50
      })
      .to(image, { y: 0 });
    timeline1
      .from(title1, { duration: 1.5, opacity: 0, y: -50, ease: "power4" })
      .to(title1, { y: 0 });
    timeline2
      .from(
        content1,
        { duration: 1.25, opacity: 0, y: -50, ease: "power4" },
        "-=2"
      )
      .to(content1, { y: 0 });
    timeline1
      .from(
        title2,
        { duration: 1.5, opacity: 0, y: -50, ease: "power4" },
        "-=1"
      )
      .to(title2, { y: 0 });
    timeline2
      .from(
        content2,
        { duration: 1.25, opacity: 0, y: -50, ease: "power4" },
        "-=1.5"
      )
      .to(content2, { y: 0 });
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

.ourQuality {
  width: 100%;
  color: black;
  .ourQuality__container {
    .illustration {
      max-width: 100%;
      margin-bottom: $verticalPadding;
      @include flex;
    }
    .description__container {
      h2,
      h3,
      p {
        margin: $verticalPadding / 2 0;
      }
      h1 {
        font-size: 1.75rem;
        font-weight: 700;
      }
      h2 {
        font-size: 1.25rem;
      }
      h3 {
        font-size: 1rem;
      }
      p {
        font-size: 0.875rem;
        color: $secondaryColor;
      }
    }
  }
}
@media (min-width: 768px) and (min-height: 500px) {
  .ourQuality .ourQuality__container .description__container {
    h1 {
      font-size: 2.25rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h3 {
      font-size: 1.25rem;
    }
    p {
      font-size: 1rem;
      color: $secondaryColor;
    }
  }
}
@media (min-width: 1024px) and (min-height: 500px) {
}
@media (min-width: 1024px) and (min-height: 500px) and (max-height: 900px) {
  .ourQuality .ourQuality__container img {
    max-height: 50vh;
  }
}
@media (min-width: 1280px) and (min-height: 500px) {
}
@media (min-width: 1650px) and (min-height: 500px) {
}
</style>
