import Vue from 'vue';
import Vuex from 'vuex';

//modules
import user from "./user";
import address from "./address";
import product from "./product";
import favorite from "./favorite";
import cart from "./cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    address,
    product,
    favorite,
    cart
  }
})
