import Vue from 'vue';
import Vuex from 'vuex';
import quiz from './modules/quiz.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    quiz
  },

  state: {
    isLoggedIn: false,
    authUser: {}
  },

  getters: {
    isLoggedIn: state => state.isLoggedIn,
    authUser:   state => state.authUser,
  },

  mutations: {
    setAuthUser(state, { userData }) {
      state.authUser = userData;
      state.isLoggedIn = true;
    },
    clearAuthUser(state) {
      state.authUser = null;
      state.isLoggedIn = false;
    }
  },

  actions: {
    delete({ commit }) {
      commit('clearAuthUser');
    },
    fetchAuthUser({ commit }, { user }) {
      const userData = {
        id:       user.uid,
        name:     user.displayName,
        photoUrl: user.photoURL,
      };
      commit('setAuthUser', { userData });
    }
  }
})
