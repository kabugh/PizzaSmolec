<template>
  <section class="delivery topView">
    <div class="delivery__container container">
      <div class="deliveryCheck__container">
        <div class="manualAddressCheck__container">
          <h1>Sprawdź czy dowozimy na wybrany adres</h1>
          <input
            type="text"
            class="autocomplete"
            placeholder="Wprowadź adres"
            ref="autocomplete"
            v-model="inputAddress"
          />
        </div>
        <div class="automaticAddressCheck__container">
          <h1>Ustal adres automatycznie</h1>
          <div class="button__wrapper">
            <button
              class="dark"
              type="button"
              @click="autolocation(google, map)"
            >
              Użyj mojej bieżącej lokalizacji
            </button>
          </div>
        </div>
        <div class="deliveryResult__container" v-if="deliveryResult">
          <div class="deliverResult__content">
            <h3 v-if="insideFreeThreshold || insidePaidThreshold">
              Dowozimy na wybrany adres!
            </h3>
            <h3 v-else>
              Niestety, nie dowozimy na wybrany adres. Zapraszamy serdecznie do
              lokalu!
            </h3>
            <p>Adres: {{ passedAddress }}</p>
            <div
              class="delivery__details"
              v-if="insideFreeThreshold || insidePaidThreshold"
            >
              <p>
                Koszt dostawy: <strong>{{ deliveryCost | currency }}</strong>
              </p>
              <p>
                Minimalna wartość zamówienia:
                <strong>{{ minimalValue | currency }}</strong>
              </p>
              <p v-if="insidePaidThreshold && !insideFreeThreshold">
                Darmowa dostawa od:
                <strong>{{
                  delivery.paidThreshold.freeDelivery | currency
                }}</strong>
              </p>
            </div>
          </div>
          <div
            class="button__wrapper"
            v-if="insideFreeThreshold || insidePaidThreshold"
          >
            <button type="button" @click="$router.push('/menu')" class="dark">
              Zamów teraz
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
    <div class="vue-map-container" ref="map"></div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import gmapsInit from "@/utils/gmaps";

interface Path {
  lat: number;
  lng: number;
}

interface Threshold {
  minimalValue: number;
  deliveryCost: number;
  freeDelivery?: number;
}

@Component({
  filters: {
    currency: (value: number) => `${value} zł`
  }
})
export default class Delivery extends Vue {
  google = "";
  map = "";

  inputAddress = "";
  passedAddress = "";
  deliveryResult = false;
  insideFreeThreshold = false;
  insidePaidThreshold = false;

  infoWindow: any = "";

  delivery: { freeThreshold: Threshold; paidThreshold: Threshold } = {
    freeThreshold: {
      minimalValue: 31,
      deliveryCost: 0
    },
    paidThreshold: {
      minimalValue: 60,
      deliveryCost: 5,
      freeDelivery: 80
    }
  };

  async mounted() {
    const mapBounds = {
      north: 51.148549,
      south: 51.023541,
      west: 16.830096,
      east: 17
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const google: any = await gmapsInit();
      const map = new google.maps.Map(this.$refs.map, {
        zoom: 13,
        center: { lat: 51.0840755, lng: 16.9018066 },
        options: {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUi: false
        },
        restriction: {
          latLngBounds: mapBounds,
          strictBounds: false
        }
      });

      this.infoWindow = new google.maps.InfoWindow();

      this.createMarker(
        google,
        map,
        { lat: 51.0840755, lng: 16.9018066 },
        { clickable: false, draggable: false },
        "marker.png"
      );

      const polygon1 = this.createPolygon(google, this.paths1, "#d4dd1f");
      const polygon2 = this.createPolygon(google, this.paths2, "#1098c6");
      const polygons = [polygon1, polygon2];

      polygon1.setMap(map);
      polygon2.setMap(map);

      const input = document.querySelector(".autocomplete") as HTMLInputElement;

      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);
      autocomplete.setFields([
        "address_components",
        "icon",
        "name",
        "geometry"
      ]);

      autocomplete.addListener("place_changed", () =>
        this.checkDelivery(google, map, autocomplete.getPlace(), polygons)
      );

      this.google = google;
      this.map = map;
    } catch (error) {
      console.error(error);
    }
    this.overlayLoading = false;
  }

  handleLocationError(
    browserHasGeolocation: any,
    infoWindow: any,
    pos: Position,
    map: any
  ) {
    infoWindow.setContent(
      browserHasGeolocation
        ? "Błąd: Nie udało się użyć twojej lokalizacji."
        : "Błąd: Twoja przeglądarka nie wspiera geolokalizacji."
    );
    infoWindow.open(map);
  }

  createMarker(
    google: any,
    map: any,
    position: Path,
    options: {},
    icon: string
  ) {
    new google.maps.Marker({
      position,
      map,
      ...options,
      icon: icon ? require(`@/assets/images/icons/${icon}`) : ""
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createPolygon(google: any, paths: Path[], fillColor: string) {
    return new google.maps.Polygon({
      paths,
      fillColor,
      strokeOpacity: 0.7
    });
  }

  checkDelivery(google: any, map: any, address: any, polygons: any[]) {
    console.log(address);
    this.passedAddress = address.name;
    this.deliveryResult = false;
    this.insideFreeThreshold = false;
    this.insidePaidThreshold = false;
    const lat = address.geometry.location.lat();
    const lng = address.geometry.location.lng();
    const point = new google.maps.LatLng(lat, lng);

    const insidePaidThreshold = google.maps.geometry.poly.containsLocation(
      point,
      polygons[1]
    );

    if (insidePaidThreshold) {
      this.insidePaidThreshold = true;
      const insideFreeThreshold = google.maps.geometry.poly.containsLocation(
        point,
        polygons[0]
      );
      if (insideFreeThreshold) {
        this.insideFreeThreshold = true;
      } else {
        this.insideFreeThreshold = false;
      }
    } else {
      this.insideFreeThreshold = false;
      this.insidePaidThreshold = false;
      map.setZoom(12);
    }

    this.deliveryResult = true;
  }

  autolocation(google: any, map: any) {
    const infoWindow = new google.maps.InfoWindow();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Lokalizacja znaleziona.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => this.handleLocationError(true, infoWindow, map.getCenter(), map)
      );
    } else this.handleLocationError(false, infoWindow, map.getCenter(), map);
  }
  paths1: Path[] = [
    { lat: 51.051946, lng: 16.871637 },
    { lat: 51.051598, lng: 16.880241 },
    { lat: 51.050779, lng: 16.910071 },
    { lat: 51.064521, lng: 16.933275 },
    { lat: 51.0699, lng: 16.938293 },
    { lat: 51.075098, lng: 16.94468 },
    { lat: 51.086182, lng: 16.934372 },
    { lat: 51.089705, lng: 16.939647 },
    { lat: 51.092117, lng: 16.94845 },
    { lat: 51.094368, lng: 16.948493 },
    { lat: 51.096261, lng: 16.947603 },
    { lat: 51.098044, lng: 16.944573 },
    { lat: 51.098495, lng: 16.942854 },
    { lat: 51.099283, lng: 16.941011 },
    { lat: 51.100332, lng: 16.938805 },
    { lat: 51.100786, lng: 16.9375 },
    { lat: 51.101, lng: 16.932453 },
    { lat: 51.096107, lng: 16.93126 },
    { lat: 51.08902, lng: 16.912116 },
    { lat: 51.093909, lng: 16.894839 },
    { lat: 51.09491, lng: 16.882437 },
    { lat: 51.091498, lng: 16.875814 },
    { lat: 51.088399, lng: 16.871499 },
    { lat: 51.082925, lng: 16.869272 },
    { lat: 51.078621, lng: 16.866903 },
    { lat: 51.057747, lng: 16.865126 }
  ];

  paths2: Path[] = [
    { lat: 51.043573, lng: 16.853751 },
    { lat: 51.040217, lng: 16.899776 },
    { lat: 51.050099, lng: 16.909859 },
    { lat: 51.057204, lng: 16.923482 },
    { lat: 51.059778, lng: 16.928266 },
    { lat: 51.06952, lng: 16.941056 },
    { lat: 51.075483, lng: 16.945505 },
    { lat: 51.08681, lng: 16.940404 },
    { lat: 51.090759, lng: 16.949123 },
    { lat: 51.096719, lng: 16.954639 },
    { lat: 51.09914, lng: 16.953571 },
    { lat: 51.100047, lng: 16.950907 },
    { lat: 51.102731, lng: 16.946267 },
    { lat: 51.104438, lng: 16.94098 },
    { lat: 51.104021, lng: 16.932827 },
    { lat: 51.104076, lng: 16.932163 },
    { lat: 51.104475, lng: 16.931897 },
    { lat: 51.11015, lng: 16.931956 },
    { lat: 51.11722, lng: 16.909096 },
    { lat: 51.12109, lng: 16.879006 },
    { lat: 51.095012, lng: 16.863515 }
  ];

  get deliveryCost() {
    return this.insideFreeThreshold
      ? this.delivery.freeThreshold.deliveryCost
      : this.delivery.paidThreshold.deliveryCost;
  }

  get minimalValue() {
    return this.insideFreeThreshold
      ? this.delivery.freeThreshold.minimalValue
      : this.delivery.paidThreshold.minimalValue;
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

      .deliveryResult__container {
        display: grid;
        row-gap: 2vh;
        @media (min-width: 768px) and (min-height: 500px) {
          grid-template-columns: repeat(2, auto);
          row-gap: 0;
          .button__wrapper {
            @include flex;
          }
        }
        column-gap: 1vw;
        .deliveryResult__content {
          margin-right: 2vw;
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
