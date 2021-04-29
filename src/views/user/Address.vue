<template>
  <div class="container address">
    <div v-if="!ADDRESS" class="loader">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <ProfileRouterLink />
      <div class="address-main">
        <div class="messageBlock">
          <p v-if="isSuccess" class="messageBlock-message messageBlock-message__success">User Successfully Updated!</p>
          <div v-if="errors">
            <p
              v-for="(error, field) in errors"
              :key="field"
              class="messageBlock-message messageBlock-message__error"
            >
              {{ error.message }}
            </p>
          </div>
        </div>
        <form class="form" @submit.prevent="updateAddress" action="">
          <div class="form-main">
            <div class="form-main-row">
              <input class="form-main-row__input" type="text" v-model="form.country" placeholder="Your Country">
              <input class="form-main-row__input" type="text" v-model="form.city" placeholder="Your City">
            </div>
            <div class="form-main-row">
              <input class="form-main-row__input" type="text" v-model="form.address" placeholder="Your Address">
              <input class="form-main-row__input" type="text" v-model="form.postcode" placeholder="Your Postcode">
            </div>
            <div class="form-main-row">
              <input class="form-main-row__input" type="text" v-model="form.phone_number" placeholder="New Phone Number">
              <button class="form-main-row__button">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileRouterLink from "../../components/user/ProfileRouterLink";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "Address",
    components: {ProfileRouterLink},
    data () {
      return {
        form: {
          country: '',
          city: '',
          address: '',
          phone_number: '',
          postcode: ''
        },
        errors: null,
        isSuccess: false
      }
    },
    computed: {
      ...mapGetters(['ADDRESS', 'accessToken'])
    },
    methods: {
      ...mapActions(['FETCH_ADDRESS', 'UPDATE_ADDRESS']),
      async updateAddress () {
        this.errors = null;
        this.isSuccess = false;
        const { success, errors } = await this.UPDATE_ADDRESS(this.form);
        if (!success) {
          return this.errors = errors;
        }
        this.isSuccess = success;
      }
    },
    watch: {
      async accessToken (newValue) {
        if (newValue) {
          this.form = await this.FETCH_ADDRESS();
        }
      },
      ADDRESS (newValue) {
        if (newValue) {
          this.form = newValue;
        }
      }
    },
    async mounted() {
      if (this.accessToken) {
        this.form = await this.FETCH_ADDRESS();
      }
    }
  }
</script>

<style lang="less" scoped>
  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
  }
  .address {
  &-main {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
  }
  .messageBlock {
    text-align: center;
    width: 400px;

  &-message {
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 10px;
   height: 30px;
   font-size: 15px;
   color: #ffffff;
   font-weight: bold;

   &__success {
    background-color: #47ff73;
   }

   &__error {
    background-color: red;
   }
  }
}
  .form {
    width: 600px;
    margin-top: 50px;

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
     width: 275px;
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

  &__button {
     width: 285px;
     height: 40px;
     border: none;
     font-family: Avenir, Helvetica, Arial, sans-serif;
     font-weight: bold;
     font-size: 15px;
     background-color: #e4e4e4;
     outline: none;
     transition: .4s;
  &:hover {
     background-color: #000000;
     color: #ffffff;
     transition: .4s;
   }
  }
  }
  }
  }
</style>
