<template>
  <div class="quiz-result">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <div v-if="cleared">
          <v-card-title>正解</v-card-title>
          <v-card-text>ヒント：{{ hint }}</v-card-text>
        </div>
        <div v-else>
          <v-card-title>不正解</v-card-title>
          <v-card-text>残念…もう一度挑戦しよう！</v-card-text>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#689F38" @click="closeDialog" v-if="!cleared" flat>再挑戦する</v-btn>
          <v-btn color="#689F38" @click="closeDialog" to="/" flat>終了する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'QuizResult',
  props: {
    dialog:  Boolean,
    cleared: Boolean,
    hint:    String,
    score:   Number
  },
  methods: {
    closeDialog() {
      this.$emit('childs-event');
    }
  }
}
</script>
