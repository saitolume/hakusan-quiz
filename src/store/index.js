import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import quiz from './modules/quiz.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    quiz
  },

  state: {
    isLoggedIn: false,
    user: {}
  },

  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user:       (state) => state.user,
  },

  mutations: {
    setUser(state, { userData }) {
      state.user = userData;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  },

  actions: {
    login({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        const userData = {
          id:       user.uid,
          name:     user.displayName,
          photoUrl: user.photoURL,
        };
        commit('setUser', { userData });
      });
    },
    logout({ commit }) {
      firebase.auth().signOut().then(() => {
        commit('clearUser');
      });
    },
    fetchUser({ commit }, { user }) {
      const userData = {
        id:       user.uid,
        name:     user.displayName,
        photoUrl: user.photoURL,
      };
      commit('setUser', { userData });
    }
  }
})
