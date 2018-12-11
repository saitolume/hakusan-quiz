import Vue from 'vue'
import Vuex from 'vuex'
import quizList from '../src/quizList.json'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    quizList: quizList,
    user: {}
  },

  getters: {
    quizList:   (state) => state.quizList,
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
