<template>
  <div class="quiz-result">
    <v-dialog v-model="dialog">
      <v-card v-if="cleared">
        <v-card-title class="headline">正解</v-card-title>
        <v-card-text>おめでとう！10ポイントゲット！</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="closeDialog" flat>終了する</v-btn>
        </v-card-actions>
      </v-card>

      <v-card v-else>
        <v-card-title class="headline">不正解</v-card-title>
        <v-card-text>残念！ヒントを探してみよう！</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="closeDialog" flat>もう一度挑戦する</v-btn>
          <v-btn color="green darken-1" @click="closeDialog" flat>終了する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'QuizResult',
  props: {
    dialog: Boolean,
    cleared: Boolean
  },
  methods: {
    closeDialog() {
      this.$emit('childs-event')
    }
  }
}
</script>
