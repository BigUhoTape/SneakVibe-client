import httpClient from "../services/http.service";

export default {
  state: {
    user: null,
    access_token: null
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data;
      state.access_token = data.access_token;
      localStorage.setItem('ACCESS_TOKEN', data.access_token);
    },
    USER_UNLOGIN (state) {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem('ACCESS_TOKEN');
    },
    SET_ACCESS_TOKEN(state, data) {
      state.access_token = data;
    }
  },
  actions: {
    async SET_ACCESS_TOKEN_ACTION ({commit}, token) {
      await commit('SET_ACCESS_TOKEN', token);
    },
    async USER_LOGIN({commit}, formData) {
      try {
        const { status, data } = await httpClient.post('auth/login', formData);
        if (status === 200) {
          commit('SET_USER', data);
          return { success: true };
        }
      } catch (e) {
        return {
          success: false,
          errors: e.response.data.errors
        };
      }
    },
    async USER_SIGNUP ({commit}, formData) {
      try {
        const { status, data } = await httpClient.post('auth/signup', formData);
        if (status === 200) {
          commit('SET_USER', data);
          await httpClient.post('address/create');
          return { success: true };
        }
      } catch (e) {
        return {
          success: false,
          errors: e.response.data.errors
        }
      }
    },
    async FETCH_USER_DATA ({ commit, getters }) {
      const { status, data } = await httpClient.get('user/index');
      if (status === 200) {
        commit('SET_USER', data);
      }
      return getters.USER;
    },
    async UPDATE_USER_DATA ({ commit, getters }, formData) {
      try {
        const { status, data } = await httpClient.put(`user/update?id=${formData.id}`, formData);
        if (status === 200) {
          commit('SET_USER', data);
          return { success: true }
        }
      } catch (e) {
        return {
          success: false,
          errors: e.response.data
        }
      }
    },
    USER_EXIT ({commit}) {
      commit('USER_UNLOGIN');
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.access_token;
    },
    accessToken: state => {
      return state.access_token;
    },
    USER: state => {
      return state.user;
    }
  }
}
