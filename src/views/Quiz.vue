<template>
  <div class="quiz" data-app>
    <div class="quiz-title">
      <h2 class="quiz-title__num">Q.{{ quiz.number }}</h2>
      <h2 class="quiz-title__text">{{ quiz.title }}</h2>
    </div>
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
    <QuizResult
      :dialog="dialog"
      :cleared="cleared"
      @childs-event="dialog = false"
    />
  </div>
</template>

<script>
import QuizResult from '@/components/QuizResult.vue';
import { mapGetters } from 'vuex';

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
    ...mapGetters(['quiz'])
  },

  created() {
    this.$store.dispatch('selectQuiz', { id: this.$route.params.id })
  }
}
</script>

<style scoped>
.quiz-title {
  margin: auto;
  margin-bottom: 30px;
  padding: 5px 0px;
  width: 80%;
}
.quiz-title__num {
  margin: auto;
}

.quiz-title__text {
  margin: auto;
  padding: 10px;
}

button.v-btn {
  margin: 20px;
}

.v-card__text {
  font-size: 17px;
}
</style>
