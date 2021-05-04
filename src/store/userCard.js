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
    }
  },
  getters: {
    USER_CARD: state => {
      return state.userCard;
    }
  }
}
