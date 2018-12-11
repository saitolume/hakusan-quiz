import Vue from 'vue'
import Vuex from 'vuex'
import quizList from '../src/quizList.json'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    quiz: {},
    user: {}
  },

  getters: {
    isLoggedIn: state => state.isLoggedIn,
    quiz:       state => state.quiz,
    user:       state => state.user,
  },

  mutations: {
    setUser(state, { userData }) {
      state.user = userData;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setQuiz(state, { quiz }) {
      state.quiz = quiz;
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
    },
    selectQuiz({ commit }, { id }) {
      const quiz = quizList[id];
      commit('setQuiz', { quiz });
    }
  }
})
