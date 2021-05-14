import httpClient from "../services/http.service";
import axios from "axios";

export default {
  state: {
    orders: null,
    isLoadingOrders: false,
    pageCount: 0
  },
  mutations: {
    SET_ORDERS (state, data) {
      state.orders = data;
      state.isLoadingOrders = false;
    },
    CHANGE_LOADING (state) {
      state.isLoadingOrders = !state.isLoadingOrders;
    },
    SET_PAGE_COUNT (state, data) {
      state.pageCount = data;
    }
  },
  actions: {
    async FETCH_ORDERS ({commit}, page = 1) {
      try {
        commit('CHANGE_LOADING');
        const { status, data, headers } = await httpClient.get(`order/index`, {
            params: { page }
          },
        );
        if (status === 200) {
          commit('SET_ORDERS', data);
          commit('SET_PAGE_COUNT', parseInt(headers['x-pagination-page-count']));
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    ORDERS: state => {
      return state.orders;
    },
    IS_LOADING_ORDERS: state => {
      return state.isLoadingOrders;
    },
    PAGE_COUNT: state => {
      return state.pageCount;
    }
  }
}
