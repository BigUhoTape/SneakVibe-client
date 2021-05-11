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
        <div v-else class="payment">
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
            class="payment-form"
            action=""
          >
            <div class="address-form-main">
              <div class="address-form-main-row">
                <input class="address-form-main-row__input" type="text" v-model="paymentForm.name" placeholder="Your Name">
                <input class="address-form-main-row__input" type="text" v-model="paymentForm.card_number" placeholder="Your Card Number">
              </div>
              <div class="address-form-main-row">
                <input class="address-form-main-row__input" type="text" v-model="paymentForm.cvc" placeholder="Your CVC">
                <date-picker
                  valueType="format"
                  class="address-form-main-row__input"
                  v-model="paymentForm.expired_date"
                  placeholder="Your Expired Date">
                </date-picker>
              </div>
              <div class="d-flex">
                <input type="checkbox" id="is_save_card" v-model="paymentForm.is_save_card">
                <label for="is_save_card">Save for next purchases</label>
              </div>
            </div>
          </form>
          <div>
            <p>Payment Address</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex">
                <span class="mr-1">{{ addressForm.country }} / </span>
                <span class="mr-1">{{ addressForm.city }}  / </span>
                <span class="mr-1">{{ addressForm.address }} / </span>
                <span class="mr-1">{{ addressForm.postcode }} / </span>
              </div>
              <button @click="backToEdit" class="editButton">Edit</button>
            </div>
          </div>
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
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css'

  export default {
    name: "Order",
    components: {
      OrderCartItem,
      DatePicker
    },
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
        paymentForm: {
          is_save_card: true,
          card_number: '',
          cvc: '',
          expired_date: '',
          name: ''
        },
        errors: null
      }
    },
    computed: {
      ...mapGetters([
        'CART',
        'ADDRESS',
        'accessToken',
        'USER_CARD'
      ]),
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
      ...mapActions([
        'FETCH_CART',
        'FETCH_ADDRESS',
        'UPDATE_ADDRESS',
        'FETCH_CARD',
        'UPDATE_CARD'
      ]),
      backToEdit () {
        this.isDelivery = true;
      },
      async nextStep () {
        this.errors = null;
        if (this.isDelivery) {
          const { success, errors } = await this.UPDATE_ADDRESS(this.addressForm);
          if (!success) {
            return this.errors = errors;
          }
          return this.isDelivery = false;
        }
        const {success, errors} = await this.UPDATE_CARD(this.paymentForm);
        if (!success) {
          return this.errors = errors;
        }
        return this.$router.push({name: 'Profile'});
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
      if (this.accessToken) {
        const user_card = await this.FETCH_CARD();
        if (user_card) {
          this.paymentForm = user_card;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editButton {
    height: 30px;
    width: 60px;
    border: none;
    font-weight: bold;
    transition: .4s;

    &:hover {
      background-color: #000000;
      transition: .4s;
      color: #ffffff;
      cursor: pointer;
    }
  }
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
