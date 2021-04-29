<template>
  <div class="productViewMain">
    <div class="loader" v-if="!PRODUCTS">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <div class="productView container">
        <div class="productView-description col-md-2">
          <p class="productView-description__model">
            {{ product.brand }} / <span class="productView-description__model_model">{{product.model}}</span>
          </p>
          <p class="productView-description__article">Article: {{ product.article }}</p>
          <p class="productView-description__color">Color: {{ product.color }}</p>
          <p class="productView-description__gender">Gender: {{ product.gender }}</p>
        </div>
        <div class="productView-swiper col-md-6">
          <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
            <swiper-slide
              v-for="(image, index) in product.productImages"
              :key="image + 'main'"
              :class="'slide-' + (index + 1)"
              :style="{width: '600px', height: '600px', display: 'flex', justifyContent: 'center' }"
            >
              <img :src="image" alt="">
            </swiper-slide>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
          </swiper>
        </div>
        <div class="productView-rightside col-md-2">
          <p v-if="similarColors && similarColors.length > 0">Other Colors</p>
          <div class="productView-rightside__similar">
            <router-link
              :to="'/product/' + similar.id"
              tag="div"
              :key="'similar' + index"
              v-for="(similar, index) in similarColors"
            >
              <img :src="similar.productImages[similar.productImages.length -1]" alt="">
            </router-link>
          </div>
          <div class="productView-rightside-price">
            <p v-if="product.discountPrice" class="productView-rightside-price__price">{{product.discountPrice}}₽</p>
            <p :class="{'productView-rightside-price__sale': product.discountPrice}">{{ product.price }}₽</p>
          </div>
          <button
            v-if="isLoggedIn && !FAVORITE_BY_ID(product.id)"
            class="add-button add-favorite"
            @click="addToFavorite"
          >
            Add To Favorite
          </button>
          <button
            v-if="FAVORITE_BY_ID(product.id)"
            class="add-button add-favorite"
            @click="removeFromFavorite"
          >
            Remove from Favorite
          </button>
          <button
            v-if="isLoggedIn && !CART_ITEM_BY_ID(product.id)"
            class="add-button add-cart"
            @click="addToCart"
          >
            Add To Cart
          </button>
          <button
            v-if="CART_ITEM_BY_ID(product.id)"
            class="add-button add-cart"
            @click="removeFromCart"
          >
            Remove From Cart
          </button>
          <p v-if="!isLoggedIn" class="login-notif">Please <router-link :to="{name: 'Profile'}">Log In</router-link> to add product to cart or favorite.</p>
        </div>
      </div>
      <VueFoldable class="transition-demo productViewDescription col-md-6" height="100">
        <p>{{ product.description }}</p>
      </VueFoldable>
      <div class="similarProducts container">
        <p class="similarProducts__header">Similar Products</p>
        <div v-if=" similarProducts && similarProducts.length > 0">
          <Slider :products="similarProducts"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
  import VueFoldable from 'vue-foldable';
  import Slider from "../../components/default/Slider";
  import 'vue-foldable/dist/vue-foldable.css';

  export default {
    name: "ProductView",
    components: {
      Swiper,
      SwiperSlide,
      VueFoldable,
      Slider
    },
    data () {
      return {
        product: {},
        similarColors: [],
        similarProducts: [],
        swiperOptionTop: {
          loop: true,
          loopedSlides: 3,
          spaceBetween: 0,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'PRODUCT_BY_ID',
        'PRODUCTS',
        'SIMILAR_COLORS',
        'SIMILAR_PRODUCTS',
        'isLoggedIn',
        'FAVORITE_BY_ID',
        'USER',
        'CART_ITEM_BY_ID'
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_PRODUCTS',
        'FETCH_FAVORITES',
        'ADD_TO_FAVORITE',
        'DELETE_FAVORITE',
        'FETCH_CART',
        'ADD_TO_CART',
        'DELETE_FROM_CART'
      ]),
      async addToFavorite () {
        const data = {
          product_id: this.product.id,
          user_id: this.USER.id
        };
        await this.ADD_TO_FAVORITE(data);
      },
      async removeFromFavorite () {
        await this.DELETE_FAVORITE(this.FAVORITE_BY_ID(this.product.id).id);
      },
      async addToCart () {
        const data = {
          product_id: this.product.id,
          user_id: this.USER.id
        };
        await this.ADD_TO_CART(data);
      },
      async removeFromCart () {
        await this.DELETE_FROM_CART(this.CART_ITEM_BY_ID(this.product.id).id);
      }
    },
    async created () {
      await this.FETCH_PRODUCTS();
      this.product = this.PRODUCT_BY_ID(this.$router.history.current.params.id);
      this.similarColors = this.SIMILAR_COLORS(this.product);
      this.similarProducts = this.SIMILAR_PRODUCTS(this.product);
      if (this.isLoggedIn) {
        await this.FETCH_FAVORITES();
        await this.FETCH_CART();
      }
    },
    beforeRouteUpdate (to, from, next) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.product = this.PRODUCT_BY_ID(to.params.id);
      this.similarColors = this.SIMILAR_COLORS(this.product);
      this.similarProducts = this.SIMILAR_PRODUCTS(this.product);
      next();
    }
  }
</script>

<style lang="less" scoped>
  .loader {
    position: absolute;
    left: 50%;
    bottom: 50%;
  }
  .login-notif {
    font-size: 20px;
  }
  .similarProducts {
    margin-top: 50px;

    &__header {
      margin: 0 0 10px 0;
      font-size: 40px;
      color: #575757;
      font-weight: bold;
      text-align: center;
      font-family: Avenir, Helvetica, Arial, sans-serif;
    }
  }
  .productViewDescription {
    margin: 0 auto;
    font-size: 20px;
    color: #575757;
  }
  .productView {
    display: flex;
    justify-content: space-between;
    /*width: 90%;*/
    margin: 0 auto;

    &-description {
      color: #575757;
      font-size: 20px;
      font-family: Avenir, Helvetica, Arial, sans-serif;

      &__model {
        font-size: 20px;
        font-weight: bold;

        &_model {
          font-weight: normal;
        }
      }
    }

    &-rightside {
      width: 20%;
      display: flex;
      flex-direction: column;
      font-size: 30px;
      font-weight: bold;
      color: #575757;

      &__similar {
        display: flex;

        div {
          width: 30%;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }


      &-price {
        display: flex;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-weight: bold;
        font-size: 25px;
        &__price {
          margin-right: 15px;
        }
        &__sale {
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-size: 20px;
          text-decoration: line-through;
          color: red;
        }
      }
    }
  }
  .productView-swiper {
    width: 50%;
  }
  .swiper {
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }

    &.gallery-thumbs .swiper-slide {
      opacity: 0.4;
    }
    &.gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
  }
  .add-button {
    margin-bottom: 15px;
    font-size: 15px;
    padding-top: 7px;
    padding-bottom: 7px;
    border: none;

    &:hover {
      cursor: pointer;
    }
  }
  .add-favorite {
    color: #343434;
    background-color: #f9f9f9;
  }
  .add-cart {
    color: #ffffff;
    background-color: #000000;
  }
</style>
