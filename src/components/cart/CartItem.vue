<template>
  <div class="cartItem">
    <div class="cartItem-main col-md-6 pl-0">
      <img
        class="cartItem-main__img"
        :src="cartItem.product.productImages[cartItem.product.productImages.length - 1]"
        alt="">
      <div class="cartItem-main-description">
      <span
        class="cartItem-main-description__brand"
      >
        {{ cartItem.product.brand }} / <span class="cartItem-main-description__brand_model">{{ cartItem.product.model }}</span>
      </span><br>
        <span class="cartItem-main-description__color">Color: {{ cartItem.product.color }}</span><br>
        <router-link
          :to="'/product/' + cartItem.product.id"
          tag="span"
          class="cartItem-main-description__link"
        >
          Product Page
        </router-link>
      </div>
    </div>
    <div class="cartItem-count col-md-3">
      <input class="cartItem-count__input col-md-4" type="number" v-model="cartItem.count">
      <button
        class="cartItem-count__btn"
        v-if="isUpdate"
        @click="updateCartItemCount"
      >
        Update
      </button>
    </div>
    <div class="cartItem-price col-md-2">
      <p class="cartItem-price__price">{{ price }}₽</p>
      <p class="cartItem-price__discount" v-if="cartItem.product.discountPrice">{{ discountPrice }}₽</p>
    </div>
    <div
      class="cartItem-delete"
      @click="deleteFromCart"
    >
      Delete
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "CartItem",
    props: {
      cartItem: {
        type: Object,
        required: true
      }
    },
    computed: {
      price () {
        if (this.cartItem.product.discountPrice) {
          return this.cartItem.product.discountPrice * this.cartItem.count;
        }
        return this.cartItem.product.price * this.cartItem.count;
      },
      discountPrice () {
        return this.cartItem.product.price * this.cartItem.count;
      }
    },
    data () {
      return {
        isUpdate: false,
        startCountValue: null
      }
    },
    watch: {
      'cartItem.count' (newValue) {
        if (newValue < 1) {
          this.cartItem.count = 1;
        }
        if (parseInt(newValue) === this.startCountValue) {
          this.isUpdate = false;
        }
        if (parseInt(newValue) !== this.startCountValue) {
          this.isUpdate = true;
        }
      }
    },
    methods: {
      ...mapActions(['UPDATE_CART_ITEM_COUNT', 'DELETE_FROM_CART']),
      async updateCartItemCount () {
        const { id, count } = this.cartItem;
        const formData = {id, count: parseInt(count)};
        const success = await this.UPDATE_CART_ITEM_COUNT(formData);
        if (success) {
          this.startCountValue = parseInt(success);
          this.isUpdate = false
        }
      },
      async deleteFromCart () {
        await this.DELETE_FROM_CART(this.cartItem.id);
      }
    },
    created() {
      this.startCountValue = this.cartItem.count;
    }
  }
</script>

<style lang="less" scoped>
  .cartItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px 20px 10px;
    border: 1px solid #b3b3b3;
    margin-bottom: 20px;
    border-radius: 10px;

    &-price {
      font-size: 20px;
      font-family: Avenir, Helvetica, Arial, sans-serif;

      &__price {
        margin-bottom: 0px;
      }

      &__discount {
        margin-top: 5px;
        color: red;
        text-decoration: line-through;
      }
    }

    &-delete {
      font-size: 17px;
      padding: 5px;
      color: red;
      transition: .4s;
      font-weight: bold;

      &:hover {
        transition: .4s;
        color: #ffffff;
        background-color: red;
        cursor: pointer;
      }
    }

    &-count {
      display: flex;
      &__input {
        border: none;
        border-bottom: 2px solid #cccccc;
        margin-right: 20px;
        outline: none;
        font-size: 20px;
        padding-right: 0px;
        transition: .4s;

        &:focus, &:hover {
          border-bottom: 2px solid #000000;
          transition: .4s;
        }
      }

      &__btn {
        border: none;
        padding: 5px;
        outline: none;
        transition: .4s;
        background-color: #d6d6d6;
        font-size: 17px;

        &:hover {
          background-color: #000;
          color: #ffffff;
          transition: .4s;
        }
      }
    }

    &-main {
       display: flex;
      align-items: center;

      &__img {
        width: 180px;
      }

      &-description {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        margin-top: 20px;

        &__brand {
          font-size: 20px;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-weight: bold;

          &_model {
            font-weight: normal;
          }
        }

        &__color {
          font-family: Avenir, Helvetica, Arial, sans-serif;
        }

        &__link {
          font-family: Avenir, Helvetica, Arial, sans-serif;
          transition: .4s;
          color: #b4b4b4;

          &:hover {
            cursor: pointer;
            color: #000000;
            transition: .4s;
          }
        }
      }
    }
  }
</style>
