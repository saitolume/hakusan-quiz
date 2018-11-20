<template>
  <div class="quiz" data-app>
    <h2 class="quiz-title">Q.{{ quiz.number }} {{ quiz.title }}</h2>
    <v-btn
      v-for="item in quiz.choices"
      :key="item.id"
      @click="showResult(item)"
      color="#689F38"
      slot="activator"
      dark large round
    >
      {{ item.id }}. {{ item.value }}
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
    showResult(quiz) {
      this.dialog = true;
      if (quiz.corrected === true) {
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
.quiz-title {
  margin: auto;
  margin-bottom: 30px;
  width: 80%;
}

button.v-btn {
  margin: 20px;
}

.v-card__text {
  font-size: 17px;
}
</style>
