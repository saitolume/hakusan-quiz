<template>
  <div class="quiz" data-app>
    <h2 class="quiz-num">Q.{{ quiz.number }}</h2>
    <h2 class="quiz-title">{{ quiz.title }}</h2>
    <v-btn
      v-for="choice in quiz.choices"
      :key="choice.id"
      @click="showResult(choice)"
      color="#689F38"
      slot="activator"
      dark large round
    >
      {{ choice.id }}. {{ choice.value }}
    </v-btn>
    <QuizResult :dialog="dialog" :cleared="cleared" @childs-event="dialog = false" />
  </div>
</template>

<script>
import QuizResult from '@/components/QuizResult.vue'

export default {
  name: 'Quiz',
  components: {
    QuizResult,
  },
  data() {
    return {
      dialog: false,
      cleared: false
    }
  },
  methods: {
    showResult(choice) {
      this.dialog = true;
      if (choice.corrected === true) {
        this.cleared = true;
      } else {
        this.cleared = false;
      }
    }
  },
  computed: {
    quiz() {
      return this.$store.getters.quizList[this.$route.params.id];
    }
  }
}
</script>

<style scoped>
.quiz-num {
  margin: auto;
  width: 75%;
}

.quiz-title {
  margin: auto;
  margin-bottom: 30px;
  width: 75%;
}

button.v-btn {
  margin: 20px;
}

.v-card__text {
  font-size: 17px;
}
</style>
