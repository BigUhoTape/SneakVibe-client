<template>
  <div class="orderCartItem w-100">
    <img
      class="orderCartItem__img"
      :src="cartItem.product.productImages[cartItem.product.productImages.length - 1]"
      alt=""
    >
    <div class="orderCartItem-description">
      <p class="orderCartItem-description__brand">
        {{ cartItem.product.brand }} /
        <span class="orderCartItem-description__brand_model">
          {{ cartItem.product.model }}
        </span>
      </p>
      <div class="orderCartItem-description__count">x {{ cartItem.count }}</div>
      <div
        class="orderCartItem-description__price"
        v-if="cartItem.product.discountPrice"
      >
        {{ cartItem.product.discountPrice * cartItem.count }}₽
      </div>
      <div
        class="orderCartItem-description__price"
        v-else
      >
        {{ cartItem.product.price * cartItem.count }}₽
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderCartItem",
    props: {
      cartItem: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .orderCartItem {
    display: flex;
    justify-content: space-between;

    &__img {
      width: 100px;
    }

    &-description {
     &__brand {
       font-family: Avenir, Helvetica, Arial, sans-serif;
       font-size: 20px;
       font-weight: bold;
       margin-bottom: 0;
       margin-top: 0;

       &_model {
         font-weight: normal;
       }
     }

      &__count {
        display: flex;
        justify-content: flex-end;
      }

      &__price {
        display: flex;
        justify-content: flex-end;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
</style>
