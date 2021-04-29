import httpClient from "../services/http.service";

export default {
  state: {
    cart: null
  },
  mutations: {
    SET_CART (state, data) {
      state.cart = data;
    },
    ADD_CART (state, data) {
      state.cart.unshift(data);
    },
    REMOVE_FROM_CART (state, id) {
      state.cart = state.cart.filter(product => product.id !== id);
    },
    UPDATE_CART_ITEM (state, data) {
      const cartItemIndex = state.cart.findIndex(item => item.id === data.id);
      state.cart[cartItemIndex] = data;
    }
  },
  actions: {
    async FETCH_CART ({ commit }) {
      try {
        const { status, data } = await httpClient('cart/index');
        if (status === 200) {
          commit('SET_CART', data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async ADD_TO_CART ({ commit }, createData) {
      try {
        const { status, data } = await httpClient.post('cart/create', createData);
        if (status === 201) {
          commit('ADD_CART', data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async DELETE_FROM_CART ({ commit }, id) {
      try {
        const { status } = await httpClient.delete(`cart/delete?id=${id}`);
        if (status === 204) {
          commit('REMOVE_FROM_CART', id);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async UPDATE_CART_ITEM_COUNT ({ commit }, formData) {
      try {
        const { status, data } = await httpClient.put(`cart/update?id=${formData.id}`, formData);
        if (status === 200) {
          commit('UPDATE_CART_ITEM', data);
          return data.count;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  },
  getters: {
    CART: state => {
      return state.cart;
    },
    CART_ITEM_BY_ID: state => id => {
      if (!state.cart) {
        return false;
      }
      return state.cart.find(cartItem => cartItem.product.id === id);
    }
  }
}
