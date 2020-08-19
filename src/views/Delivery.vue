<template>
  <section class="delivery topView">
    <div class="delivery__container container">
      <div class="deliveryCheck__container">
        <div class="manualAddressCheck__container">
          <h1>Sprawdź czy dowozimy na wybrany adres</h1>
          <gmap-autocomplete
            placeholder="Wprowadź adres"
            @place_changed="checkDelivery"
          >
          </gmap-autocomplete>
          <p v-if="inRange">Dowozimy</p>
        </div>
        <div class="automaticAddressCheck__container">
          <h1>Ustal adres automatycznie</h1>
          <div class="button__wrapper">
            <button class="dark" type="button">
              Użyj mojej bieżącej lokalizacji
            </button>
          </div>
        </div>
      </div>
      <div class="description__container">
        <h1>Nasze menu na dowóz</h1>
        <p>
          Z poszanowaniem dla Państwa, w naszym menu na dowóz, które proponujemy
          Państwu, poza pizzą znalazły się tylko wyselekcjonowane dania, które
          jesteśmy Państwu dostarczyć w tak krótkim czasie aby nie utraciły one
          swojego smaku i aromatu. Nie zależy nam na ilości sprzedanych
          „placków” pizzy, makaronów czy innych dań.
        </p>
        <p>
          Dla nas najważniejsza jest jakość i Państwa zadowolenie. Nasi kucharze
          i pizzaiolo są specjalistami w swym fachu i chcemy aby ich praca nie
          szła na marne. Mamy nadzieję, że będziecie mogli docenić ich kunszt.
        </p>
        <p>
          Ze swojej strony prosimy o wyrozumiałość w sytuacjach losowych, gdyż
          na pewne jak korki czy inne zdarzenia drogowe nie mamy wpływu .
        </p>
        <p>
          Jednak prosimy pamiętać, iż żadna potrawa w dostawie nie będzie tak
          smakować jak ta podana na miejscu. Zapraszamy więc serdecznie.
        </p>
      </div>
    </div>
    <GmapMap
      :center="{ lat: 51.0840755, lng: 16.9018066 }"
      :zoom="13"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      }"
    >
      <GmapMarker
        :position="{ lat: 51.0840755, lng: 16.9018066 }"
        :clickable="false"
        :draggable="false"
        ref="marker"
      />
    </GmapMap>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Delivery extends Vue {
  inRange = false;

  mounted() {
    this.overlayLoading = false;
    // (this.$refs
    //   .marker as any).icon = require("@/assets/images/icons/marker.png"));
  }

  checkDelivery(address: any) {
    console.log(address);
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

.delivery {
  width: 100%;
  color: black;
  &.topView {
    padding-bottom: 0;
  }
  .delivery__container {
    display: grid;
    row-gap: $verticalPadding;
    margin: 0 auto;
    h1 {
      font-size: 1.25rem;
      font-weight: 700;
    }
    .deliveryCheck__container {
      display: grid;
      row-gap: $verticalPadding;
      .manualAddressCheck__container {
        input {
          margin-top: 2vh;
          min-width: 50%;
          transition: border-color 0.15s ease-in-out;
          &:focus {
            border-color: $mainColor;
          }
        }
      }

      .automaticAddressCheck__container {
        .button__wrapper {
          margin-top: $verticalPadding / 3;
          button {
            font-size: 12px;
          }
        }
      }
    }
    .description__container {
      h2,
      h3,
      p {
        margin: $verticalPadding / 2 0;
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
  .vue-map-container {
    width: 100%;
    min-height: 80vh;
  }
}
@media (min-width: 768px) and (min-height: 500px) {
  .delivery .delivery__container {
    h1 {
      font-size: 2rem;
    }
    .description__container {
      h2 {
        font-size: 1.5rem;
      }
      h3 {
        font-size: 1.25rem;
      }
      p {
        font-size: 1rem;
        color: $secondaryColor;
        margin: $verticalPadding / 3 0;
      }
    }
  }
}
@media (min-width: 1024px) and (min-height: 500px) {
  .delivery .delivery__container .deliveryCheck__container {
    max-width: 90vw;
    grid-template-columns: repeat(2, auto);
    align-items: flex-start;
    column-gap: $horizontalPadding / 6;
  }
}
@media (min-width: 1024px) and (min-height: 500px) and (max-height: 900px) {
}
@media (min-width: 1280px) and (min-height: 500px) {
  .delivery .delivery__container {
    max-width: 90vw;
    grid-template-columns: repeat(2, minmax(20vw, 1fr));
    align-items: flex-start;
    column-gap: $horizontalPadding / 2;
    .deliveryCheck__container {
      grid-template-columns: auto;
    }
  }
}
@media (min-width: 1650px) and (min-height: 500px) {
}
</style>
