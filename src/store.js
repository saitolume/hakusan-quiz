import Vue from 'vue'
import Vuex from 'vuex'
import quizList from '../src/quizList.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    quizList: quizList,
    user: {}
  },

  getters: {
    quizList: (state) => state.quizList,
    user:     (state) => state.user
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
    logIn({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        const user = result.user;
        const userData = {
          id:       user.uid,
          email:    user.email,
          name:     user.name,
          photoUrl: user.photoURL,
        }
        commit('setUser', { userData });
      });
    },
    logOut({ commit }) {
      firebase.auth().signOut().then(() => {
        commit('clearUser');
      });
    }
  }
})
