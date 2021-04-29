<template>
  <div class="container profile">
    <div v-if="!USER" class="loader">
      <vue-loaders-pacman color="black" scale="1"/>
    </div>
    <div v-else>
      <ProfileRouterLink />
      <div class="profile-main">
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
        <form class="form" @submit.prevent="updateUserInformation" action="">
          <div class="form-main">
            <div class="form-main-row">
              <input class="form-main-row__input" type="text" v-model="form.email" placeholder="Your Email">
              <div class="infoRadio">
                <div class="infoRadio-item" @click="gender = 'male'">
                  <input type="radio" id="gender1" v-model="form.gender" value="male"
                         class="infoRadio-item__radio">
                  <label for="gender1" class="infoRadio-item__label">Male</label>
                </div>
                <div class="infoRadio-item" @click="gender = 'female'">
                  <input type="radio" id="gender2" v-model="form.gender" value="female"
                         class="infoRadio-item__radio">
                  <label for="gender2" class="infoRadio-item__label">Female</label>
                </div>
              </div>
            </div>
            <div class="form-main-row">
              <input class="form-main-row__input" type="text" v-model="form.name" placeholder="Your Name">
              <input class="form-main-row__input" type="text" v-model="form.last_name" placeholder="Your Last Name">
            </div>
            <div class="form-main-row">
              <input class="form-main-row__input" type="password" v-model="password" placeholder="New Password">
              <button class="form-main-row__button">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ProfileRouterLink from "../../components/user/ProfileRouterLink";


  export default {
    name: "Profile",
    components: {ProfileRouterLink},
    data () {
      return {
        form: {
          name: '',
          last_name: '',
          gender: '',
          email: ''
        },
        password: null,
        errors: null,
        isSuccess: false
      }
    },
    methods: {
      ...mapActions(['UPDATE_USER_DATA']),
      async updateUserInformation () {
        const data = this.form;
        data.password = this.password;
        this.password = null;
        this.isSuccess = false;
        this.errors = null;
        const { success, errors } = await this.UPDATE_USER_DATA(data);
        if (!success) {
          return  this.errors = errors;
        }
        this.isSuccess = success;
      }
    },
    computed: {
      ...mapGetters(['USER'])
    },
    watch: {
      USER (newValue) {
        if (newValue) {
          this.form = newValue;
        }
      }
    },
    mounted() {
      if (this.USER) {
        this.form = this.USER;
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
  .profile {
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
  .infoRadio {
    display: flex;

    &-item {
      &__radio {
        display: none;
      }

      &__label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 140px;
        height: 40px;
        border: 1px solid black;
        cursor: pointer;
        font-size: 15px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-weight: bold;
        letter-spacing: 1.2px;
        transition: .4s;
      }

      &__radio:checked + &__label {
        background-color: black;
        color: #ffffff;
        transition: .4s;
      }
    }
  }
</style>
