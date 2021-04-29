<template>
    <div class="signup">
        <router-link
                to="/home"
                tag="button"
                class="signup__btn"
        >Home</router-link>
        <router-link
                to="/login"
                tag="button"
                class="signup__btn"
        >Login</router-link>
        <h3 class="signup__header">Sign up</h3>
        <form class="form" @submit.prevent="signup" action="">
            <div v-if="errors">
                <p
                        v-for="(error, index) in errors"
                        :key="index"
                        class="form__error"
                >
                    {{ error[0] }}
                </p>
            </div>
                <input class="form__input" type="text" v-model="form.email" placeholder="Enter Your Email"><br>
                <input class="form__input" type="text" v-model="form.name" placeholder="Enter Your Name"><br>
                <input class="form__input" type="text" v-model="form.last_name" placeholder="Enter Your Last Name"><br>
                <input type="radio" id="male" v-model="form.gender" value="male">
                <label for="male">Male</label>
                <input type="radio" id="female" v-model="form.gender" value="female">
                <label for="female">Female</label><br>
                <input class="form__input" type="password" v-model="form.password" placeholder="Enter Your Password"><br>
                <input class="form__input" type="password" v-model="form.password_repeat" placeholder="Repeat Your Password"><br>
                <button class="signup__btn">Sign Up</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

  export default {
    name: "Signup",
    data () {
      return {
        form: {
          email: '',
          name: '',
          last_name: '',
          gender: 'male',
          password: '',
          password_repeat: ''
        },
        errors: null
      }
    },
    methods: {
      ...mapActions([
        'USER_SIGNUP'
      ]),
      async signup () {
        const { success, errors } = await this.USER_SIGNUP(this.form);
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
    .signup {
        padding-top: 100px;
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
        label {
          display: inline-block;
          width: 48%;
          height: 30px;
          border: solid 2px #ccc;
          transition: all 0.3s;
          padding-top: 10px;
          color: #313131;
          margin-top: 10px;
          margin-bottom: 10px;
          text-align: center;
        }

        input[type="radio"] {
            display: none;
        }

        input[type="radio"]:checked + label {
            border: solid 2px #000000;
            color: #000;
        }
    }
</style>
