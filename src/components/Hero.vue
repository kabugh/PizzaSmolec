<template>
  <header class="hero">
    <div class="hero__container">
      <div class="pizza__description">
        <!-- <h1>Pizza <span>Prosciutto e fungi</span></h1>
        <div class="button__container">
          <div class="price__tag">30 zł</div>
          <button type="button" @click="$router.push('/menu')">
            Zamów teraz
          </button> -->
        <!-- </div> -->
      </div>
      <div class="pizza__container">
        <img
          src="@/assets/images/base.png"
          alt="base"
          class="base unselectable"
          ref="base"
        />
        <img
          src="@/assets/images/pizzasmall.png"
          alt="pizza"
          class="pizza unselectable"
          ref="pizza"
        />
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TimelineLite } from "gsap";

@Component
export default class Hero extends Vue {
  mounted() {
    this.startAnimation(1);
  }

  startAnimation(initialDelay: number) {
    const pizza = this.$refs.pizza;
    const base = this.$refs.base;

    const tl = new TimelineLite();

    tl.from(base, {
      duration: 1.5,
      opacity: 0,
      ease: "power4",
      y: -50,
      delay: initialDelay
    }).to(base, { y: 0, opacity: 1 });
    tl.from(
      pizza,
      {
        duration: 2,
        opacity: 0,
        ease: "expo",
        y: -150,
        rotateZ: -90
      },
      "-=1.5"
    ).to(pizza, { rotate: 0 });
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";

.hero {
  width: 100%;
  height: 100vh;
  @include backgroundDefault;
  background-image: url("../assets/images/bg.png");
  .hero__container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    padding: $verticalPadding / 2 $horizontalPadding / 4;
    width: 100%;
    height: 100%;
    .pizza__description {
      h1 {
        span {
          color: $mainColor;
          padding-bottom: 4px;
          border-bottom: 3px solid $mainColor;
        }
      }
      .button__container {
        @include flex;
        justify-content: flex-start;
        flex-direction: row;
        margin-top: 2vh;
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
    .pizza__container {
      position: relative;
      @include flex;
      > img {
        max-width: 100%;
        position: absolute;
      }
      .pizza {
        margin-top: -1vh;
        padding-right: 2vh;
      }
    }
  }
}
</style>
