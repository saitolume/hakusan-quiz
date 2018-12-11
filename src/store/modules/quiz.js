import quizList from '@/quizList.json';

export default {
  state: {
    number: 0,
    title: '',
    choices: [] 
  },
  getters: {
    quiz: (state) => {
      const quiz = {
        number:  state.number,
        title:   state.title,
        choices: state.choices,
      }
      return quiz
    }
  },
  mutations: {
    setQuiz(state, { quiz }) {
      state.number = quiz.number;
      state.title = quiz.title;
      state.choices = quiz.choices;
    }
  },
  actions: {
    selectQuiz({ commit }, { id }) {
      const quiz = quizList[id];
      commit('setQuiz', { quiz });
    }
  }
}
