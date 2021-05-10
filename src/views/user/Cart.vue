<template>
  <div class="cart container">
    <div class="loader" v-if="!CART">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div
      class="noItems"
      v-else-if="!CART.length"
    >
      Your Cart is Empty
    </div>
    <div class="d-flex" v-else>
      <div class="cartMain col-md-10">
        <CartItem
          v-for="item in CART"
          :key="item.id + 'cart'"
          :cartItem="item"
        />
      </div>
      <div class="cart-right col-md-2">
        <div class="cart-right-main">
          <p class="cart-right-main__total">Total:</p>
          <p class="cart-right-main__price">{{ totalPrice }}₽</p>
        </div>
        <router-link
          to="order"
          tag="button"
          class="cart-right__btn"
        >
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import CartItem from "../../components/cart/CartItem";

  export default {
    name: "Cart",
    components: {
      CartItem
    },
    computed: {
      ...mapGetters(['CART']),
      totalPrice () {
        return this.CART.reduce((total, item) => {
          if (item.product.discountPrice) {
            return total + item.product.discountPrice * parseInt(item.count);
          }
          return total + item.product.price * parseInt(item.count)
        }, 0);
      }
    },
    methods: {
      ...mapActions(['FETCH_CART'])
    },
    async created() {
      await this.FETCH_CART();
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    display: flex;

    &-right {
      height: 180px;
      border: 1px solid #b3b3b3;
      border-radius: 10px;
      padding: 20px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__btn {
        background-color: #dcdcdc;
        border: none;
        outline: none;
        font-size: 15px;
        padding: 5px 0px;
        transition: .4s;

        &:hover {
          background-color: #000000;
          color: #ffffff;
          transition: .4s;
          cursor: pointer;
        }
      }

      &-main {
        &__total {
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-weight: bold;
          font-size: 20px;
          margin-top: 0px;
        }

        &__price {
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-size: 20px;
        }
      }
    }
  }
  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .noItems {
    position: absolute;
    top: 45%;
    left: 35%;
    font-size: 50px;
  }
</style>
