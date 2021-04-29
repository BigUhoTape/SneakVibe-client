<template>
  <router-link :to="{ name: 'ProductView', params: { id: product.id }}" class="catalogItem" tag="div">
    <div>
      <img :src="product.image"
           alt="Product image"
           class="catalogItem__img"
      >
    </div>
    <div class="catalogItem-price">
      <p v-if="product.discountPrice" class="catalogItem-price__price">{{product.discountPrice}}₽</p>
      <p :class="{'catalogItem-price__sale': product.discountPrice}">{{ product.price }}₽</p>
    </div>
    <p class="catalogItem__name">{{product.brand}} <span class="catalogItem__name_model">/ {{ product.model }}</span></p>
  </router-link>
</template>

<script>
  export default {
    name: "CatalogItem",
    props: {
      product: {
        type: Object,
        default () {
          return {};
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .catalogItem {
    padding: 25px;
    transition: .3s;
    margin-bottom: 50px;
    width: 250px;

    &__img {
      width: 200px;
    }

    &__name {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-weight: bold;
      font-size: 20px;
      margin-top: 15px;
      &_model {
        font-weight: normal;
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

    &:hover {
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      border-radius: 7px;
      transition: .3s;
      cursor: pointer;
    }
  }
</style>
