<template>
  <div class="quiz" data-app>
    <div class="quiz-title">
      <h2 class="quiz-title__num">Q.{{ quiz.number }}</h2>
      <h2 class="quiz-title__text">{{ quiz.title }}</h2>
    </div>
    <v-btn
      v-for="choice in quiz.choices"
      :key="choice.id"
      @click="sendResult(choice)"
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
import axios from 'axios'

export default {
  name: 'Quiz',

  components: {
    QuizResult,
  },

  data() {
    return {
      dialog:  false,
      cleared: false
    }
  },

  methods: {
    async sendResult(choice) {
      this.dialog = true;
      choice.corrected ? this.cleared = true : ''
      const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`;
      await axios.get(`${USER_URL}/answer_history/${this.quiz.number}/failed_count.json`)
        .then(response => {
          let failed_count = response.data;
          axios.get(`${USER_URL}/score.json`)
            .then(response => {
              let score = response.data;
              if (choice.corrected === true) {
                if (failed_count === 0) {
                  score += 4;
                } else if (failed_count === 1) {
                  score += 3;
                } else if (failed_count === 2) {
                  score += 2;
                } else {
                  score += 1;
                }
                axios.patch(`${USER_URL}.json`, { score });
              } else {
                this.cleared = false;
                failed_count++;
                axios.patch(`${USER_URL}/answer_history/${this.quiz.number}.json`, { failed_count });
              }
            });
        });
    }
  },

  computed: {
    ...mapGetters(['quiz', 'authUser']),
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
