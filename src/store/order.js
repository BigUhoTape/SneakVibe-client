import httpClient from "../services/http.service";

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
    },
    UPDATE_ORDER_DATA (state, data) {
      const index = state.orders.findIndex(order => order.id === data.id);
      state.orders[index] = data;
      console.log(state.orders[index]);
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
    },
    async CANCEL_ORDER ({ commit }, id) {
      try {
        const { status, data } = await httpClient.put(`order/update?id=${id}`);
        if (status === 200) {
          commit('UPDATE_ORDER_DATA', data);
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
