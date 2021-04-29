import httpClient from "../services/http.service";

export default {
  state: {
    address: null
  },
  mutations: {
    SET_ADDRESS (state, data) {
      state.address = data;
    }
  },
  actions: {
    async FETCH_ADDRESS ({commit, getters}) {
      const { status, data } = await httpClient.get('address/index');
      if (status === 200) {
        commit('SET_ADDRESS', data[0]);
      }
      return getters.ADDRESS;
    },
    async UPDATE_ADDRESS ({commit}, formData) {
      try {
        console.log(formData);
        const { status, data } = await httpClient.put(`address/update?id=${formData.id}`, formData);
        if (status === 200) {
          commit('SET_ADDRESS', data);
          return { success: true }
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
    ADDRESS: state => {
      return state.address;
    }
  }
}
