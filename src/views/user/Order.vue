<template>
  <div class="order container">
    <div class="loader" v-if="!CART || !ADDRESS">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div class="d-flex" v-else>
      <div class="col-md-8">
        <div class="d-flex">
          <div v-bind:class="isDelivery ? 'col-md-6 text-center isActiveClass' : 'col-md-6 text-center'">
            Delivery
          </div>
          <div v-bind:class="!isDelivery ? 'col-md-6 text-center isActiveClass' : 'col-md-6 text-center'">
            Payment
          </div>
        </div>
        <div v-if="isDelivery" class="address">
          <div class="address-messageBlock">
            <div v-if="errors">
              <p
                v-for="(error, field) in errors"
                :key="field"
                class="address-messageBlock-message address-messageBlock-message__error"
              >
                {{ error.message }}
              </p>
            </div>
          </div>
          <form
            class="address-form"
            action=""
          >
            <div class="address-form-main">
              <div class="address-form-main-row">
                <input class="address-form-main-row__input" type="text" v-model="addressForm.country" placeholder="Your Country">
                <input class="address-form-main-row__input" type="text" v-model="addressForm.city" placeholder="Your City">
              </div>
              <div class="address-form-main-row">
                <input class="address-form-main-row__input" type="text" v-model="addressForm.address" placeholder="Your Address">
                <input class="address-form-main-row__input" type="text" v-model="addressForm.postcode" placeholder="Your Postcode">
              </div>
              <div class="address-form-main-row">
                <input class="address-form-main-row__input" type="text" v-model="addressForm.phone_number" placeholder="Your Phone Number">
              </div>
            </div>
          </form>
        </div>
        <div v-else>
          payment
        </div>
      </div>
      <div class="col-md-4">
        <div class="order-items pr-2">
          <OrderCartItem
            v-for="item in CART"
            :key="item.id + 'orderItem'"
            :cartItem="item"
          />
        </div>
        <hr>
        <div class="order-total">
          <span class="order-total__total">Total</span>
          <span class="order-total__totalprice">{{ totalPrice }}₽</span>
        </div>
        <button @click="nextStep" class="order__btn">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import OrderCartItem from "../../components/order/OrderCartItem";

  export default {
    name: "Order",
    components: {OrderCartItem},
    data: function () {
      return {
        isDelivery: true,
        addressForm: {
          country: '',
          city: '',
          address: '',
          phone_number: '',
          postcode: ''
        },
        errors: null
      }
    },
    computed: {
      ...mapGetters(['CART', 'ADDRESS', 'accessToken']),
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
      ...mapActions(['FETCH_CART', 'FETCH_ADDRESS', 'UPDATE_ADDRESS']),
      async nextStep () {
        this.errors = null;
        if (this.isDelivery) {
          const { success, errors } = await this.UPDATE_ADDRESS(this.addressForm);
          if (!success) {
            return this.errors = errors;
          }
          return this.isDelivery = false;
        }
      }
    },
    watch: {
      async accessToken (newValue) {
        if (newValue) {
          this.addressForm = await this.FETCH_ADDRESS();
        }
      },
      ADDRESS (newValue) {
        if (newValue) {
          this.addressForm = newValue;
        }
      }
    },
    async created () {
      if (!this.CART) {
        await this.FETCH_CART();
      }
      if (this.accessToken) {
        this.addressForm = await this.FETCH_ADDRESS();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .isActiveClass {
    font-weight: bold;
    font-size: 20px;
  }
  .loader {
    position: absolute;
    top: 45%;
    left: 45%;
  }
  .order {
    &-items {
      height: 200px;
      overflow-y: scroll;
    }

    &-total {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      &__total {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        font-weight: bold;
      }

      &__totalprice {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        font-weight: bold;
      }
    }

    &__btn {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      border: none;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      font-size: 20px;
      font-weight: bold;
      transition: .4s;

      &:hover {
        transition: .4s;
        background-color: #000000;
        color: white;
        cursor: pointer;
      }
    }
  }
  .address {
    &-messageBlock {
      width: 100%;
      text-align: center;

      &-message {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 30px;
        font-size: 15px;
        color: #ffffff;
        font-weight: bold;
        background-color: red;
      }
    }

    &-form {
      &-main {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;

          &__input {
            width: 45%;
            height: 40px;
            font-family: Avenir, Helvetica, Arial, sans-serif;
            font-size: 15px;
            border: none;
            border-bottom: 2px solid #b3b3b3;
            outline: none;
            padding-left: 10px;
            transition: .4s;

            &:focus {
              border-bottom: 2px solid #000000;
              transition: .4s;
            }
          }
        }
      }
    }
  }
</style>
