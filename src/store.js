import Vue from 'vue'
import Vuex from 'vuex'
import quizList from '../src/quizList.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizList: quizList
  },
  getters: {
    quizList: (state) => state.quizList
  },
  mutations: {

  },
  actions: {

  }
})
