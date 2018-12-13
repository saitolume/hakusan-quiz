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

const BASE_URL = 'https://hakusan-quiz.firebaseio.com'

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['isLoggedIn', 'authUser'])
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        const user = result.user;
        axios.get(`${BASE_URL}/users/${user.uid}.json`).then(response => {
          if (!response.data) {
            const users = {}
            users[user.uid] = {
              "answer_history": [
                {},
                { "answer_count": 0, "cleared": false },
                { "answer_count": 0, "cleared": false },
                { "answer_count": 0, "cleared": false },
                { "answer_count": 0, "cleared": false },
                { "answer_count": 0, "cleared": false },
                { "answer_count": 0, "cleared": false },
                { "answer_count": 0, "cleared": false },
              ],
              "score": 0
            }
            axios.patch(`${BASE_URL}/users.json`, users)
          }
        })
      });
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
