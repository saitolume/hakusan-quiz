<template>
  <v-card v-show="showed" color="white">
    <v-card-title primary-title>
      <div>Q{{ quiz.number }}</div>
      <span>{{ quiz.title }}</span>
    </v-card-title>
    <v-card-actions>
      <v-btn icon @click="arrowDown = !arrowDown">
        <v-icon>{{ arrowDown ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text v-show="arrowDown">説明文</v-card-text>
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
    ...mapGetters(['authUser'])
  },

  async created() {
    if (this.authUser) {
      const USER_URL = `https://hakusan-quiz.firebaseio.com/users/${this.authUser.id}`
      await axios.get(`${USER_URL}/answer_history/${this.quiz.number}/cleared.json`)
        .then(response => {
          this.showed = response.data
        })
    }
  }
}
</script>

<style scoped>
.v-card__title span {
  text-align: left;
}

.v-card {
  margin-bottom: 15px;
}
</style>

