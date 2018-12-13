import quizList from '@/quizList.json';

export default {
  state: {
    // id: '',
    number: 0,
    title: '',
    choices: [] 
  },
  getters: {
    quiz: (state) => {
      const quiz = {
        // id:      state.id,
        number:  state.number,
        title:   state.title,
        choices: state.choices,
      }
      return quiz
    }
  },
  mutations: {
    setQuiz(state, { quiz }) {
      // state.id = quiz.id;
      state.number = quiz.number;
      state.title = quiz.title;
      state.choices = quiz.choices;
    }
  },
  actions: {
    selectQuiz({ commit }, { id }) {
      // TODO: setQuizが無駄に何度も動かないようにする
      // if (state.id === id) {
      //   return
      // }
      const quiz = quizList[id];
      commit('setQuiz', { quiz });
    }
  }
}
