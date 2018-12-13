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
      this.showResult(choice);
      const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`;
      let score;
      let failed_count;
      // Realtime Databaseからscoreとfailed_countを取得
      await axios.get(`${USER_URL}/score.json`)
        .then(response => {
          score = response.data;
        });
      await axios.get(`${USER_URL}/answer_history/${this.quiz.number}/failed_count.json`)
        .then(response => {
          failed_count = response.data;
        });
      // failed_countで条件分岐をしてscoreを加算
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
        await axios.patch(`${USER_URL}.json`, { score });
      } else {
        // 間違えたときにfailed_countを+1して更新
        failed_count++;
        await axios.patch(`${USER_URL}/answer_history/${this.quiz.number}.json`, { failed_count });
      }
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
