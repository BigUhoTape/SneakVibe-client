<template>
  <div class="home">
    <div v-if="!PRODUCTS" class="loader">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <div class="home-header">
        <div class="container">
          <div class="header">
            <p class="header__brand">Nike</p>
            <p class="header__model">air max 95</p>
            <p class="header__price">9 990<span class="header__price_ruble">₽</span></p>
            <button class="header__buyBtn">Купить</button>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="man-woman">
          <router-link to="/man" class="man-woman-item">
            <img src="../../assets/images/homePage/forMan.png" alt="" class="man-woman-item__img">
            <p class="man-woman-item__name">MAN</p>
          </router-link>
          <router-link to="/woman" class="man-woman-item">
            <img src="../../assets/images/homePage/forWoman.png" alt="" class="man-woman-item__img">
            <p class="man-woman-item__name man-woman-item__name_woman">WOMAN</p>
          </router-link>
        </div>
        <div class="homeSlider">
          <RadioComponent @changeRadio="radioValue" :propRadio="propRadio"/>
          <div v-if="slider === 'New'" class="container">
            <Slider :products="SLIDER_NEW_PRODUCTS"/>
          </div>
          <div v-else-if="slider === 'Sale'" class="container">
            <Slider :products="SLIDER_SALE_PRODUCTS"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RadioComponent from "../../components/default/RadioComponent";
  import Slider from "../../components/default/Slider";
  import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    RadioComponent,
    Slider
  },
  data() {
    return {
      propRadio: {
        value1: 'New',
        value2: 'Sale'
      },
      slider: 'New'
    }
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'SLIDER_NEW_PRODUCTS', 'SLIDER_SALE_PRODUCTS'])
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS']),
    radioValue(value) {
      this.slider = value;
    }
  },
  async created() {
    await this.FETCH_PRODUCTS();
  }
}
</script>

<style lang="less" scoped>
  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .home {
    &-header {
      background: url("../../assets/images/homePage/nikeAirMax.png") no-repeat center center;
      height: calc(100vh - 110px);
    }
  }
  .header {
    text-align: right;
    padding-top: 150px;

    &__brand {
      color: #D2D2D2;
      font-size: 60px;
      text-transform: uppercase;
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }

    &__model {
      color: #D2D2D2;
      font-size: 30px;
      text-transform: uppercase;
      margin-top: 35px;
      margin-bottom: 30px;
    }

    &__price {
      color: #ffffff;
      font-size: 50px;
      margin-bottom: 30px;

      &_ruble {
        font-size: 40px;
      }
    }

    &__buyBtn {
      border-radius: 5px;
      width: 177px;
      height: 52px;
      background-color: #D2D2D2;
      color: #4e4e4e;
      font-size: 25px;
      transition: 0.3s;
      border: none;

      &:hover {
        cursor: pointer;
        transition: 0.3s;
        color: #ffffff;
        background-color: #000000;
      }
    }
  }
  .man-woman {
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;

    &-item {
      overflow: hidden;
      position: relative;
      height: 100vh;

      &__img {
        display: block;
        transition: .3s;

        &:hover {
          transform: scale(1.1);
        }
      }

      &__name {
        position: absolute;
        bottom: 70px;
        left: 35px;
        color: #ffffff;
        font-size: 40px;

        &_woman {
          left: 35px;
        }
      }
    }
  }
  .homeSlider {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 110px;
    margin-bottom: 100px;
  }
</style>
