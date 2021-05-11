import httpClient from "../services/http.service";

export default {
  state: {
    userCard: null
  },
  mutations: {
    SET_CARD (state, data) {
      state.userCard = data;
    }
  },
  actions: {
    async FETCH_CARD ({commit, getters}) {
      const { status, data } = await httpClient.get('user-card/index');
      if (status === 200) {
        commit('SET_CARD', data[0]);
      }
      return getters.USER_CARD;
    },
    async UPDATE_CARD ({ commit }, formData) {
      try {
        const { status } = await httpClient.post('order/create', formData);
        if (status === 201) {
           return {
             success: true
           }
        }
      } catch (e) {
        return {
          success: false,
          errors: e.response.data
        }
      }
    }
  },
  getters: {
    USER_CARD: state => {
      return state.userCard;
    }
  }
}
