import httpClient from "../services/http.service";

export default {
  state: {
    favorite: null
  },
  mutations: {
    SET_FAVORITE(state, data) {
      state.favorite = data;
    },
    REMOVE_FAVORITE(state, id) {
      state.favorite = state.favorite.filter(product => product.id !== id);
    },
    ADD_FAVORITE (state, data) {
      state.favorite.push(data);
    }
  },
  actions: {
    async FETCH_FAVORITES({commit}) {
      try {
        const {status, data} = await httpClient('favorite/index');
        if (status === 200) {
          commit('SET_FAVORITE', data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async DELETE_FAVORITE({commit}, id) {
      try {
        const {status} = await httpClient.delete(`favorite/delete?id=${id}`);
        if (status === 204) {
          commit('REMOVE_FAVORITE', id);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async ADD_TO_FAVORITE ({ commit }, createData) {
      try {
        const { status, data } = await httpClient.post('favorite/create', createData);
        if (status === 201) {
          commit('ADD_FAVORITE', data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  getters: {
    FAVORITE: state => {
      return state.favorite;
    },
    FAVORITE_BY_ID: state => id => {
      if (!state.favorite) {
        return false;
      }
      return state.favorite.find(favorite => favorite.product.id === id);
    }
  }
}
