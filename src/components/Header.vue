<template>
  <div class="header">
    <v-toolbar color="#689F38" height="50px" dark app>
      <v-btn flat icon large>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="logout" v-if="isLoggedIn" flat>ログアウト</v-btn>
        <v-btn @click="login" v-else flat>ログイン</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['isLoggedIn', 'user'])
  },

  methods: {
    ...mapActions(['login', 'logout'])
  }
}
</script>

<style scoped>
.v-toolbar__title {
  font-weight: bold;
}

button.v-btn {
  margin: 0px;
}
</style>
