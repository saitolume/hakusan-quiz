<template>
  <div class="quiz" data-app>
    <div class="quiz-title">
      <h2 class="quiz-title__num">Q.{{ quiz.number }}</h2>
      <h2 class="quiz-title__text">{{ quiz.title }}</h2>
    </div>
    <p v-if="disabled">この問題は解答済みです</p>
    <v-btn
      v-for="choice in quiz.choices"
      :disabled="disabled"
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
      cleared:  false,
      dialog:   false,
      disabled: false,
      resultScore: 0,
    }
  },

  methods: {
    async sendResult(choice) {
      const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`;
      let score;
      let failedCount;
      // Realtime DatabaseからscoreとfailedCountを取得する
      await axios.get(`${USER_URL}/score.json`)
        .then(response => {
          score = response.data;
        });
      await axios.get(`${USER_URL}/answer_history/${this.quiz.number}/failedCount.json`)
        .then(response => {
          failedCount = response.data;
        });
      if (choice.corrected === true) {
        // 正解のときはfailedCountで分岐した条件によってscoreを加算する
        if (failedCount === 0) {
          score += 4;
          this.resultScore = 4;
        } else if (failedCount === 1) {
          score += 3;
          this.resultScore = 3;
        } else if (failedCount === 2) {
          score += 2;
          this.resultScore = 2;
        } else if (failedCount === 1) {
          score += 1;
          this.resultScore = 1;
        } else {
          alert('エラーが発生しました')
        }
        await axios.patch(`${USER_URL}.json`, { score });
        await axios.patch(`${USER_URL}/answer_history/${this.quiz.number}.json`, { cleared: true });
      } else {
        // 誤答のときはfailedCountを+1する
        failedCount++;
        await axios.patch(`${USER_URL}/answer_history/${this.quiz.number}.json`, { failedCount });
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

  async mounted() {
    const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`;
    await axios.get(`${USER_URL}/answer_history/${this.quiz.number}/cleared.json`)
      .then(response => {
        if (response.data === true) {
          // クリア済みクイズを解かせないためにリダイレクトで対処
          // this.$router.push('/');
          // ボタンを無効化して対処
          this.disabled = true
        }
      });
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
