<template>
    <div class="login">
        <router-link
                to="/home"
                tag="button"
                class="login__btn"
        >Home</router-link>
        <router-link
                to="/signup"
                tag="button"
                class="login__btn"
        >Sign Up</router-link>
        <h3 class="login__header">Login</h3>
        <form class="form" @submit.prevent="login" action="">
            <div v-if="errors">
                <p
                        v-for="(error, field) in errors"
                        :key="field"
                        class="form__error"
                >
                    {{ error[0] }}
                </p>
            </div>
            <input class="form__input" type="text" v-model="form.email" placeholder="Your Email"><br>
            <input class="form__input" type="password" v-model="form.password" placeholder="Your Password"><br>
            <button :disabled="isDisable" class="login__btn">Login</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

  export default {
    name: "Login",
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        errors: null,
        isDisable: false
      }
    },
    methods: {
      ...mapActions([
        'USER_LOGIN'
      ]),
      async login () {
        const { success, errors } = await this.USER_LOGIN(this.form);
        this.isDisable = false;
        if (success) {
          this.$router.push({name: 'home'});
        } else {
          this.errors = errors;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .login {
        padding-top: 150px;
        margin: 0 auto;
        width: 300px;
        line-height: 50%;
        &__btn {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            font-size: 20px;
            width: 100%;
            height: 40px;
            background-color: #ebebeb;
            border: none;
            transition: .4s;
            margin-bottom: 10px;
            &:hover {
                background-color: #000;
                color: #ffffff;
                transition: .4s;
                cursor: pointer;
            }
        }

        &__header {
          font-size: 30px;
          width: 100%;
          text-align: center;
          margin-top: 20px;
          margin-bottom: 30px;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          font-weight: bold;
        }
    }
    .form {
        &__input {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            width: 100%;
            margin-bottom: 10px;
            height: 40px;
            font-size: 15px;
            border: none;
            border-bottom: 2px solid #d4d4d4;
            outline: none;
            padding-left: 10px;
            transition: .4s;
            &:focus {
                border-bottom: 2px solid #000000;
                transition: .4s;
            }
        }

        &__error {
          background-color: #ff3b22;
          width: 100%;
          border: 1px solid red;
          color: #ffffff;
          padding: 10px 5px 10px 5px;
          font-size: 15px;
          font-weight: bold;
          border-radius: 10px;
          margin-bottom: 10px;
        }
    }
</style>
