<template>
  <div class="quiz">
    <h2>Q{{ quiz.id }}. {{ quiz.title }}</h2>
      <v-btn
        v-for="item in quiz.choice"
        :key="item.number"
        color="#689F38"
        dark large round
      >{{ item.number }}. {{ item.value }}
      </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  data() {
    return {
      quiz: {
        id: 1,
        title: '白山手取川ジオパークの「ジオ」の由来は何でしょう',
        choice: [
          { number: 1, value: '地球', isCorrected: true },
          { number: 2, value: '地震', isCorrected: false },
          { number: 3, value: '台風', isCorrected: false },
          { number: 4, value: '火事', isCorrected: false },
        ],
      },
    }
  },
}
</script>

<style scoped>
h2 {
  margin: auto;
  margin-bottom: 30px;
  width: 80%;
}
</style>
