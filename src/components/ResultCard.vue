<template>
  <v-card v-show="showed" color="white">
    <v-card-title primary-title>
      <span>Q{{ quiz.number }}. {{ quiz.title }}</span>
    </v-card-title>
    <v-card-text>
      <span>A. {{ correctChoice.value }}</span>
    </v-card-text>
    <v-card-actions>
      <v-btn flat @click="arrowDown = !arrowDown">
        <v-icon>{{ arrowDown ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        <span>{{ arrowDown ? 'ヒントを閉じる' : 'ヒントを確認する' }}</span>
      </v-btn>
    </v-card-actions>
    <v-card-text v-show="arrowDown">{{ quiz.hint }}</v-card-text>
  </v-card>
</template>

<script>
import quizList from '@/quizList.json';
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: 'ResultCard',

  props: {
    quizId: {
      type:     String,
      required: true
    }
  },

  data() {
    return {
      arrowDown: false,
      showed: false
    }
  },

  computed: {
    quiz() {
      return quizList[this.$props.quizId]
    },
    // FIXME: ウンコードなのでキレイにする
    correctChoice() {
      let val
      this.quiz.choices.forEach(choice => {
        if (choice.corrected === true) {
          val = choice
        }
      });
      return val
    },
    ...mapGetters(['authUser'])
  },

  methods: {
    fetchClearState() {
      if (this.authUser) {
        const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`
        axios.get(`${USER_URL}/answer_history/${this.quiz.number}/cleared.json`)
          .then(response => {
            this.showed = response.data
          })
      }
    }
  },

  created() {
    this.fetchClearState();
  }
}
</script>

<style scoped>
.v-card__title span {
  text-align: left;
}

.v-card__text {
  text-align: left;
}

.v-card {
  margin-bottom: 15px;
}
</style>

