<template>
  <div class="header">
    <v-toolbar color="#689F38" height="55px" dark app>
      <v-btn v-if="isLoggedIn" flat icon>
        <v-img class="user-photo" :src="user.photoUrl"></v-img>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="logout" v-if="isLoggedIn" flat small>ログアウト</v-btn>
        <v-btn @click="login" v-else flat small>ログイン</v-btn>
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
.user-photo {
  border-radius: 50%;
}
</style>
