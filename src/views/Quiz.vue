<template>
  <div class="quiz" data-app>
    <h2>Q.{{ quiz.number }} {{ quiz.title }}</h2>
    <v-btn
      v-for="(item, index) in quiz.choices"
      :key="item.id"
      @click="chengeResult(item, index)"
      color="#689F38"
      slot="activator"
      dark large round
    >
      {{ item.id }}. {{ item.value }}
    </v-btn>
    <QuizResult :dialog="dialog" :cleared="quiz.cleared" @childs-event="dialog = false" />
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
      quiz: {
        number: 1,
        id: '',
        title: '白山手取川ジオパークの「ジオ」の由来は何でしょう',
        choices: [
          { id: 1, value: '地球', corrected: true },
          { id: 2, value: '地震', corrected: false },
          { id: 3, value: '台風', corrected: false },
          { id: 4, value: '火事', corrected: false },
        ],
        cleared: false,
      },
    }
  },
  methods: {
    chengeResult(item, index) {
      this.dialog = true;
      if (this.quiz.choices[index].corrected === true) {
        this.quiz.cleared = true;
      } else {
        this.quiz.cleared = false;
      }
    }
  }
}
</script>

<style scoped>
h2 {
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
