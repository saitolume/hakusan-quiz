<template>
  <v-card color="white">
    <v-card-title primary-title>
      <div>Q{{ quiz.number }}</div>
      <span>{{ quiz.title }}</span>
    </v-card-title>
    <v-card-actions>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text v-show="show">
      説明文
    </v-card-text>
  </v-card>
</template>

<script>
import quizList from '@/quizList.json';

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
      show: false
    }
  },

  computed: {
    quiz() {
      return quizList[this.$props.quizId]
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

