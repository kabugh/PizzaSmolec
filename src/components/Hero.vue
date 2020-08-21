<template>
  <header class="hero">
    <div class="moving__items" ref="movingItems">
      <div
        class="moving__item--container"
        v-for="(item, index) in currentPizza.movingItems"
        :key="index"
        ref="movingItem"
        :class="item.className"
      >
        <img
          :src="require(`@/assets/images/pizzaAssets/${item.image}`)"
          :alt="item.className"
          class="moving__item unselectable"
          :class="[{ rellax: item.isMoving }]"
          :data-rellax-speed="
            item.isMoving
              ? item.parallaxSpeed
                ? item.parallaxSpeed
                : 1 + getRandomInt(0, 4)
              : 0
          "
        />
      </div>
    </div>
    <div class="static__container" ref="staticNav">
      <div class="burger__container">
        <div
          class="nav-mobile"
          id="nav-icon"
          :class="{ open: isNavOpen }"
          @click="isNavOpen = !isNavOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="logo__container">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="logo unselectable"
        />
      </div>
      <div class="nav__container">
        <div class="contact__details">
          <h2 class="address">ul. Śliwkowa 134 - Smolec</h2>
          <a class="phone" href="tel:0048510400616">+48 510 400 616</a>
        </div>
        <nav class="static__nav">
          <ul class="navItems">
            <li class="item" v-for="item in navItems" :key="item.link">
              <span @click="$router.push(item.link)">{{ item.title }}</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="hero__container">
      <div
        class="pizza__description rellax"
        :data-rellax-speed="3 + getRandomInt(0, 3)"
      >
        <div class="pizza__description--container" ref="desc">
          <div class="title__container">
            <h1>
              Pizza <span>{{ currentPizza.title }}</span>
            </h1>
            <div class="button__container">
              <div class="price__tag">{{ currentPizza.price }} zł</div>
              <button type="button" @click="$router.push('/menu')">
                Zamów teraz
              </button>
            </div>
          </div>
          <div class="details__container">
            <div
              class="item__container"
              v-for="(item, index) in heroDescription"
              :key="item.title"
            >
              <img
                :src="require(`@/assets/images/icons/${item.image}`)"
                :alt="item.title"
                class="unselectable"
              />
              <div class="text__container">
                <h3>{{ item.title }}</h3>
                <p v-if="item.description">{{ item.description }}</p>
                <p v-else-if="!item.headItem">
                  {{ pizzas[index].ingredients.join(", ") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pizza__container rellax" data-rellax-speed="5">
        <img
          src="@/assets/images/base.webp"
          alt="base"
          class="base unselectable"
          ref="base"
        />
        <img
          :src="require(`@/assets/images/${currentPizza.image}`)"
          alt="pizza"
          class="pizza unselectable"
          ref="pizza"
          v-scroll-to="'.introduction'"
        />
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TimelineMax } from "gsap";
import Rellax from "rellax";

interface MovingItem {
  image: string;
  className: string;
  isMoving: boolean;
  direction: "top" | "bottom" | "left" | "right";
  parallaxSpeed?: number;
}

interface Pizza {
  title: string;
  price: number;
  image: string;
  ingredients: string[];
  movingItems?: MovingItem[];
}

interface HeroDescriptionItem {
  title: string;
  image: string;
  description?: string;
  headItem?: boolean;
  link?: string;
}

interface NavItem {
  title: string;
  link: string;
}

@Component
export default class Hero extends Vue {
  activePizzaIndex = 0;

  mounted() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rellax = new Rellax(".rellax");
    this.startAnimation();
  }

  get isNavOpen() {
    return this.$store.getters.isNavOpen;
  }

  set isNavOpen(value) {
    this.$store.commit("setNav", value);
  }

  get currentPizza(): Pizza {
    return this.pizzas[this.activePizzaIndex];
  }

  pizzas: Pizza[] = [
    {
      title: "Prosciutto e fungi",
      price: 25,
      image: "funghi.webp",
      ingredients: ["sos pomidorowy", "mozzarella", "szynka", "pieczarki"],
      movingItems: [
        {
          image: "champ1.png",
          className: "champ1",
          isMoving: true,
          direction: "left"
        },
        {
          image: "pepper.png",
          className: "pepper",
          isMoving: true,
          direction: "left"
        },
        {
          image: "basil1.png",
          className: "basil1",
          isMoving: false,
          direction: "bottom"
        },
        {
          image: "tomatoes.png",
          className: "tomatoes",
          isMoving: false,
          direction: "top"
        },
        {
          image: "champ2.png",
          className: "champ2",
          isMoving: true,
          direction: "right"
        },
        {
          image: "olives.png",
          className: "olives",
          isMoving: true,
          direction: "left",
          parallaxSpeed: 10
        },
        {
          image: "pepper1.png",
          className: "pepper1",
          isMoving: false,
          direction: "bottom"
        },
        {
          image: "mozarella1.png",
          className: "mozarella1",
          isMoving: true,
          direction: "right"
        },
        {
          image: "mozarella2.png",
          className: "mozarella2",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "basil4.png",
          className: "basil4",
          isMoving: true,
          direction: "bottom",
          parallaxSpeed: 10
        },
        {
          image: "pepper2.png",
          className: "pepper2",
          isMoving: true,
          direction: "top"
        }
      ]
    },
    {
      title: "Capresse",
      price: 27,
      image: "capresse.webp",
      ingredients: ["sos pomidorowy", "mozzarella", "szynka", "pieczarki"],
      movingItems: [
        {
          image: "tomato1.png",
          className: "tomato1",
          isMoving: true,
          direction: "left"
        },
        {
          image: "lamblettuce1.png",
          className: "lamblettuce1",
          isMoving: true,
          direction: "left"
        },
        {
          image: "pepper.png",
          className: "pepper",
          isMoving: true,
          direction: "left"
        },
        {
          image: "tomato2.png",
          className: "tomato2",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "basil1.png",
          className: "basil1",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "tomatoes.png",
          className: "tomatoes",
          isMoving: false,
          direction: "top"
        },
        {
          image: "basil3.png",
          className: "basil3",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "lamblettuce2.png",
          className: "lamblettuce2",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "pepper1.png",
          className: "pepper1",
          isMoving: false,
          direction: "bottom"
        },
        {
          image: "tomato3.png",
          className: "tomato3",
          isMoving: true,
          direction: "right"
        },
        {
          image: "mozarella1.png",
          className: "mozarella1",
          isMoving: true,
          direction: "right"
        },
        {
          image: "mozarella2.png",
          className: "mozarella2",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "lamblettuce3.png",
          className: "lamblettuce3",
          isMoving: true,
          direction: "right"
        },
        {
          image: "tomato4.png",
          className: "tomato4",
          isMoving: true,
          direction: "top"
        },
        {
          image: "pepper2.png",
          className: "pepper2",
          isMoving: true,
          direction: "top"
        }
      ]
    },
    {
      title: "Parma",
      price: 30,
      image: "parma.webp",
      ingredients: ["sos pomidorowy", "mozzarella", "szynka", "pieczarki"],
      movingItems: [
        {
          image: "olives.png",
          className: "olives",
          isMoving: true,
          direction: "left",
          parallaxSpeed: 10
        },
        {
          image: "cheese1.png",
          className: "cheese1",
          isMoving: true,
          direction: "left"
        },
        {
          image: "desk.png",
          className: "desk",
          isMoving: false,
          direction: "bottom"
        },
        {
          image: "pepper1.png",
          className: "pepper1",
          isMoving: false,
          direction: "bottom"
        },
        {
          image: "rocket1.png",
          className: "rocket1",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "basil3.png",
          className: "basil3",
          isMoving: true,
          direction: "bottom",
          parallaxSpeed: 10
        },
        {
          image: "basil4.png",
          className: "basil4",
          isMoving: true,
          direction: "bottom",
          parallaxSpeed: 10
        },
        {
          image: "cheese2.png",
          className: "cheese2",
          isMoving: true,
          direction: "bottom"
        },
        {
          image: "rocket3.png",
          className: "rocket3",
          isMoving: true,
          direction: "right"
        },
        {
          image: "rocket2.png",
          className: "rocket2",
          isMoving: true,
          direction: "right"
        },
        {
          image: "pepper2.png",
          className: "pepper2",
          isMoving: true,
          direction: "right"
        }
      ]
    }
  ];

  heroDescription: HeroDescriptionItem[] = [
    {
      title: "Gdzie zjeść i gdzie dowozimy?",
      image: "pin.png",
      headItem: true
    },
    {
      title: "Składniki",
      image: "list.png"
    },
    {
      title: "Film",
      image: "video.png",
      description: "Ekskluzywne nagrania tworzenia pizzy"
    },
    {
      title: "Zdjecia",
      image: "camera.png",
      description: "Zobacz jak jedzą nasi klienci"
    }
  ];

  navItems: NavItem[] = [
    {
      title: "Menu",
      link: "/menu"
    },
    {
      title: "Nasza jakość",
      link: "/nasza-jakosc"
    },
    {
      title: "Nasze centrum",
      link: "/nasze-centrum"
    },
    {
      title: "Galeria",
      link: "/galeria"
    },
    {
      title: "Gdzie dowozimy?",
      link: "/dostawa"
    },
    {
      title: "Kontakt",
      link: "/kontakt"
    }
  ];

  updatePizzaIndex() {
    if (this.activePizzaIndex < this.pizzas.length - 1) this.activePizzaIndex++;
    else this.activePizzaIndex = 0;
  }

  startAnimation() {
    const pizza = this.$refs.pizza;
    const base = this.$refs.base;
    const desc = this.$refs.desc;
    const staticNav = this.$refs.staticNav;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movingItem: any = this.$refs.movingItem;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ar: any = [].slice.call(movingItem);

    const tl = new TimelineMax();

    tl.set(ar, {
      autoAlpha: 0,
      y: 150,
      delay: 1
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tl as any).staggerTo(
      ar,
      1.5,
      {
        ease: "expo",
        autoAlpha: 1,
        y: 0
      },
      0.15
    );

    tl.from(
      base,
      {
        duration: 1.5,
        opacity: 0,
        ease: "power4",
        y: -50
      },
      "-=2.5"
    );

    tl.from(
      pizza,
      {
        duration: 2,
        opacity: 0,
        ease: "expo",
        y: -150
      },
      "-=2"
    );

    tl.from(
      desc,
      {
        duration: 1.5,
        opacity: 0,
        ease: "power4",
        y: -50
      },
      "-=1"
    );

    tl.from(
      staticNav,
      {
        duration: 2,
        opacity: 0,
        ease: "expo",
        y: 150
      },
      "-=2"
    ).to(staticNav, {
      opacity: 1,
      y: 0,
      delay: 1
    });

    const delay = 8;
    tl.addPause(delay, () => this.changeAnimation());
  }

  changeAnimation() {
    const pizza = this.$refs.pizza;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const movingItem: any = this.$refs.movingItem;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ar: any = [].slice.call(movingItem);
    const delay = 8;

    const tl = new TimelineMax({ repeat: -1, repeatDelay: delay });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tl as any).staggerTo(
      ar,
      2,
      {
        autoAlpha: 0,
        opacity: 0,
        ease: "expo",
        y: 150
      },
      0.1
    );

    tl.from(
      pizza,
      {
        duration: 2,
        opacity: 1,
        ease: "expo",
        y: 0
      },
      "-=5"
    ).to(
      pizza,
      {
        opacity: 0,
        y: 150,
        onComplete: () => this.updatePizzaIndex()
      },
      "-=1.5"
    );

    tl.set(ar, { autoAlpha: 0, y: 150 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tl as any).staggerTo(
      ar,
      1.5,
      {
        autoAlpha: 1,
        ease: "expo",
        y: 0,
        delay: 1
      },
      0.15,
      "-=1"
    );

    tl.from(
      pizza,
      {
        duration: 2,
        opacity: 0,
        ease: "expo",
        y: -150
      },
      "-=3"
    );
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/global.scss";
.hero {
  width: 100%;
  height: 100vh;
  @include backgroundDefault;
  background-image: url("../assets/images/bg.jpg");
  position: relative;
  .static__container {
    position: static;
    display: grid;
    grid-template-columns: 1fr;
    padding: $verticalPadding / 4 $horizontalPadding;
    row-gap: 4vw;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 2;
    .burger__container {
      position: absolute;
      top: 6vh;
      right: 8vh;
    }
    .logo__container {
      width: 80%;
      height: 15vh;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .nav__container {
      z-index: 1;
      .contact__details {
        @include flex;

        padding-bottom: $verticalPadding / 6;
        h2,
        a {
          font-weight: 800;
          font-size: 1.25rem;
          text-shadow: 1px 2px rgba(0, 0, 0, 0.3);
          text-decoration: none;

          &.phone {
            color: $mainColor;
          }
        }
      }
      .static__nav {
        display: none;
      }
    }
  }
  .moving__items {
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    .moving__item--container {
      max-width: 15vw;
      max-height: 20vw;
      position: absolute;
      display: none;
      visibility: hidden;
      .moving__item {
        max-width: 100%;
        max-height: 100%;
      }
      &.visible {
        visibility: visible;
      }
      &.champ1 {
        left: -4vw;
        top: 35%;
      }
      &.pepper {
        top: 60%;
        left: -4vw;
      }
      &.basil1 {
        bottom: 0;
        left: 10vw;
      }
      &.tomatoes {
        top: -3vh;
        left: 50%;
      }
      &.olives {
        left: 0;
        top: 10%;
        max-width: 5vw;
      }
      &.pepper1 {
        bottom: 0;
        left: 30%;
      }
      &.mozarella1 {
        right: 2%;
        top: 5%;
        max-width: 10vw;
      }
      &.mozarella2 {
        right: 15%;
        bottom: 5%;
        max-width: 10vw;
      }
      &.champ2 {
        right: 0%;
        bottom: 5%;
        z-index: 1;
      }
      &.basil4 {
        right: 0%;
        bottom: 0%;
        z-index: 0;
      }
      &.pepper2 {
        right: 0;
        top: 0;
        max-width: 5vw;
      }
      &.cheese1 {
        left: -1vw;
        top: 40%;
        max-width: 12vw;
      }
      &.desk {
        left: -3vh;
        bottom: -3vh;
        max-width: 25vw;
      }
      &.rocket2 {
        bottom: 1vh;
        left: 45%;
        max-width: 20vw;
      }
      &.basil3 {
        bottom: 3vh;
        left: 37.5%;
      }
      &.cheese2 {
        bottom: -1vh;
        right: 15%;
      }
      &.rocket3 {
        bottom: 16vh;
        right: -1vh;
      }
      &.rocket1 {
        top: 10vh;
        right: 8vh;
      }
      &.tomato1 {
        top: 5%;
        left: 4vh;
        max-width: 8vw;
      }
      &.lamblettuce1 {
        top: 25%;
        left: 0;
      }
      &.tomato2 {
        bottom: 1vh;
        left: 8vh;
        max-width: 8vw;
      }
      &.lamblettuce2 {
        bottom: -2vh;
        left: 47%;
      }
      &.tomato3 {
        bottom: -1vh;
        right: -2vw;
      }
      &.lamblettuce3 {
        right: 10vw;
        top: 4vh;
      }
      &.tomato4 {
        right: -3vw;
        top: 30%;
        max-width: 8vw;
      }

      @media (max-width: 767px) {
        &.basil4,
        &.pepper1,
        &.olives {
          max-width: 40vw;
          max-height: 40vw;
          display: block;
        }

        @media (min-width: 360px) {
          &.pepper {
            max-width: 40vw;
            max-height: 40vw;
            display: block;
            top: 50%;
            left: -5vh;
          }
        }

        &.pepper1 {
          bottom: 0;
        }

        &.basil4 {
          bottom: 1vh;
          right: 0;
          max-width: 20vw;
        }

        &.olives {
          max-width: 10vw;
          left: 0;
          bottom: 0;
          top: auto;
        }
      }
    }
    z-index: 0;
  }
  .hero__container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 1fr;
    padding: $verticalPadding / 2 $horizontalPadding / 4;
    row-gap: $verticalPadding;
    width: 100%;
    height: 60vh;
    z-index: 1;
    .pizza__description {
      grid-row: 2;
      @include flex;
      align-items: center;
      padding: 0 $horizontalPadding / 3;
      z-index: 1;
      .pizza__description--container {
        @include flex;
        align-items: center;

        .title__container {
          @include flex;
          h1 {
            font-size: 1.5rem;
            span {
              color: $mainColor;
              padding-bottom: 2px;
              border-bottom: 3px solid $mainColor;
            }
          }
          .button__container {
            display: grid;
            grid-template-columns: 0.4fr 1fr;
            margin-top: 2vh;
            max-width: max-content;
            .price__tag {
              @include flex;
              background-color: $invertedColor;
              color: $brandColor;
              padding: 14px 10px;
              text-align: center;
              font-weight: 700;
              font-size: 0.875rem;
              height: 100%;
            }
            button {
              background-color: $mainColor;
              color: $secondaryColor;
              border: none;
              height: 100%;
              font-size: 0.875rem;
              padding: 8px 16px;
              &:hover {
                background-color: $secondaryColor;
                color: white;
              }
            }
          }
        }

        .details__container {
          row-gap: $verticalPadding / 2;
          display: none;
          .item__container {
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: $horizontalPadding;
            align-items: center;
            justify-content: center;
            height: 100%;
            img {
              width: 36px;
              height: 36px;
              object-fit: cover;
            }
            .text__container {
              h3 {
                font-weight: 600;
              }
              p {
                font-size: 0.875rem;
              }
            }
          }
        }
      }
    }
    .pizza__container {
      position: relative;
      @include flex;
      z-index: 1;
      > img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
      }
      .base {
        max-height: 130%;
      }
      .pizza {
        max-width: 90%;
        max-height: 90%;
        margin-top: -1vh;
        z-index: 5;

        transform-origin: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 768px) and (min-height: 500px) {
    .static__container {
      position: absolute;
      padding: $verticalPadding / 4 $horizontalPadding / 4;
      width: 100%;
      grid-template-columns: 30vw auto;

      .nav__container {
        .contact__details {
          justify-content: flex-end;
          h2:first-of-type {
            margin-right: 20px;
          }
        }
        .static__nav {
          .navItems {
            padding: $verticalPadding / 8 $horizontalPadding / 8;
            display: grid;
            grid-template-columns: repeat(6, auto);
            grid-template-rows: 1fr;
            column-gap: $horizontalPadding / 8;
            background-color: rgba(0, 0, 0, 0.4);
            .item {
              font-size: 1.25rem;
              line-height: 1.5;
              color: white;
              white-space: nowrap;
              :hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .hero__container {
      grid-template-columns: 1fr 1.5fr;
      grid-template-rows: auto;
      padding: $verticalPadding / 2 $horizontalPadding / 4;
      height: 100%;
      .pizza__description {
        padding: 0 $horizontalPadding / 6;
        align-items: flex-end;
        grid-row: auto;
        .pizza__description--container {
          align-items: flex-start;
          .title__container {
            display: block;
            h1 {
              font-size: 2rem;
            }
            .button__container {
              .price__tag {
                font-size: 1rem;
              }
              button {
                font-size: 1rem;
                padding: 14px 26px;
              }
            }
          }
          .details__container {
            display: grid;
            .item__container {
              column-gap: $horizontalPadding / 6;

              &:first-of-type {
                margin-bottom: 10vh;
              }
              img {
                width: 48px;
                height: 48px;
              }
            }
          }
        }
      }
      .pizza__container .pizza {
        max-width: 70%;
        max-height: 80%;
        padding-right: 2vh;
      }
    }
  }

  @media (max-width: 850px) and (max-height: 450px) and (orientation: landscape) {
    .static__container {
      width: 100%;
      grid-template-columns: 1fr 2fr;
      padding-top: $verticalPadding / 2;
      .logo__container {
        width: 100%;
        height: 30vh;
      }
    }
    .moving__items {
      display: none;
    }
    .hero__container {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      .pizza__description {
        grid-row: 1;
        grid-column: 1;
        .pizza__description--container {
          .title__container h1 {
            margin-bottom: $verticalPadding / 2;
          }
        }
      }
      .pizza__container {
        grid-row: 1;
        grid-column: 2;
      }
    }
  }

  @media (max-width: 750px) and (max-height: 450px) and (orientation: landscape) {
  }

  @media (max-width: 650px) and (max-height: 450px) and (orientation: landscape) {
  }

  @media (min-width: 1024px) {
    .static__container {
      grid-template-columns: 30vw auto;
      .burger__container {
        display: none;
      }
      .nav__container {
        .contact__details {
          flex-direction: row;
        }
        .static__nav {
          display: block;
        }
      }
    }
  }

  @media (min-width: 1280px) and (min-height: 768px) {
    .moving__items {
      top: auto;
      .moving__item--container {
        display: block;
      }
    }
  }
}
</style>
