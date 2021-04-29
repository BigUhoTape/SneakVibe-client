<template>
  <router-link
    class="favoriteItem"
    :to="{ name: 'ProductView', params: { id: favorite.product.id }}"
    tag="div"
  >
    <img
      :src="favorite.product.productImages[favorite.product.productImages.length - 1]"
      alt=""
      class="favoriteItem__img"
    >
    <div class="favoriteItem-price">
      <p v-if="favorite.product.discountPrice" class="favoriteItem-price__price">{{favorite.product.discountPrice}}₽</p>
      <p :class="{'favoriteItem-price__sale': favorite.product.discountPrice, 'favoriteItem-price__price': true}">{{ favorite.product.price }}₽</p>
    </div>
    <p class="favoriteItem__brand">
      {{ favorite.product.brand }} / <span class="favoriteItem__brand_model">{{ favorite.product.model }}</span>
    </p>
    <button
      @click.prevent="deleteFavorite"
      class="favoriteItem__btn"
    >
      Remove from favorites
    </button>
  </router-link>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "FavoriteItem",
    props: {
      favorite: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...mapActions(['DELETE_FAVORITE']),
      async deleteFavorite () {
        await this.DELETE_FAVORITE(this.favorite.id);
      }
    }
  }
</script>

<style lang="less" scoped>
  .favoriteItem {
    padding: 25px;
    width: 250px;
    height: 400px;
    margin-right: 30px;
    transition: .3s;

    &__btn {
      width: 100%;
      height: 30px;
      border: none;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
      background-color: #f4f4f4;
      transition: .4s;

      &:hover {
        color: #ffffff;
        background-color: #000;
        transition: .4s;
      }
    }

    &__img {
      width: 100%;
    }

    &__brand {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
      height: 50px;
      margin-top: 10px;

      &_model {
        font-weight: normal;
      }
    }

    &-price {
      display: flex;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 0;
      &__price {
        margin-right: 15px;
        margin-bottom: 0;
        margin-top: 10px;
      }
      &__sale {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        text-decoration: line-through;
        color: red;
        margin-bottom: 0;
        margin-top: 10px;
      }
    }

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      border-radius: 7px;
      transition: .3s;
      cursor: pointer;
    }
  }
</style>
