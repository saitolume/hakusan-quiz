<template>
  <div class="footer">
    <v-bottom-nav :value="true" color="light-green darken-2" dark app>
      <v-btn color="white" to="/" flat>
        <span>ホーム</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn color="white" to="/area" flat>
        <span>エリア</span>
        <v-icon>place</v-icon>
      </v-btn>

      <v-btn color="white" to="/clear_list" flat>
        <span>クリア済み</span>
        <v-icon>done_outline</v-icon>
      </v-btn>

      <v-btn color="white" to="/help" flat>
        <span>使い方</span>
        <v-icon>help</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
