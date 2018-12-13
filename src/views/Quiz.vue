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
      :score="resultScore"
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
      cleared: false,
      resultScore: 0,
    }
  },

  methods: {
    async sendResult(choice) {
      const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`;
      let score;
      let failed_count;
      // Realtime Databaseからscoreとfailed_countを取得する
      await axios.get(`${USER_URL}/score.json`)
        .then(response => {
          score = response.data;
        });
      await axios.get(`${USER_URL}/answer_history/${this.quiz.number}/failed_count.json`)
        .then(response => {
          failed_count = response.data;
        });
      if (choice.corrected === true) {
        // 正解のときはfailed_countで分岐した条件によってscoreを加算する
        if (failed_count === 0) {
          score += 4;
          this.resultScore = 4;
        } else if (failed_count === 1) {
          score += 3;
          this.resultScore = 3;
        } else if (failed_count === 2) {
          score += 2;
          this.resultScore = 2;
        } else {
          score += 1;
          this.resultScore = 1;
        }
        await axios.patch(`${USER_URL}.json`, { score });
      } else {
        // 誤答のときはfailed_countを+1する
        failed_count++;
        await axios.patch(`${USER_URL}/answer_history/${this.quiz.number}.json`, { failed_count });
      }
      this.showResult(choice);
    },
    showResult(choice) {
      this.dialog = true;
      this.cleared = choice.corrected ? true : false
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
