<template>
  <div class="clear-list pa-4">
    <ResultCard quizId="1a8c40e105e93ac6856a" />
    <ResultCard quizId="f1ad65d9d29c9d8b154d" />
    <ResultCard quizId="7fe9b47cc6c0836222af" />
    <ResultCard quizId="cb5f850a9811d2a4bc3a" />
    <ResultCard quizId="c70105f684e6816621d2" />
    <ResultCard quizId="ac4c19dd36cd182841bc" />
    <ResultCard quizId="db8495fac3fbc6cd2569" />
  </div>
</template>

<script>
import ResultCard from '@/components/ResultCard'

export default {
  name: 'ClearList',
  components: {
    ResultCard
  }
}
</script>
