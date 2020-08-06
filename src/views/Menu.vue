<template>
  <section class="menu">
    <div class="menu__container">
      <iframe
        src="https://tenis-planet-restauracja.skubacz.pl/restauracja/tenis-planet-restauracja"
        id="skubacz_menu_widget"
      ></iframe>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Menu extends Vue {}
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";

.menu {
  width: 100%;
  padding: $verticalPadding * 2 0 $verticalPadding 0;
  .menu__container {
    max-width: 80%;
    margin: 0 auto;
    iframe {
      width: 100%;
      height: 100vh - 3 * $verticalPadding;
      border: 2px solid lightgray;
    }
  }
}
</style>
