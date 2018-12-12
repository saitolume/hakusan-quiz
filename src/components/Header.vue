<template>
  <div class="header">
    <v-toolbar color="#689F38" height="55px" dark app>
      <v-btn v-if="isLoggedIn" flat icon>
        <v-img class="user-photo" :src="authUser.photoUrl"></v-img>
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
import { mapGetters} from 'vuex'
import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['isLoggedIn', 'authUser'])
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    logout() {
      firebase.auth().signOut();
    }
  }
}
</script>

<style scoped>
.user-photo {
  border-radius: 50%;
}
</style>
