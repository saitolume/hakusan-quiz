<template>
  <div class="header">
    <v-toolbar color="#689F38" height="50px" dark app>
      <v-toolbar-items>
        <v-btn flat icon large>
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
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
