<template>
  <div id="app">
    <Header />
    <div class="content-area">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: #DCEDC8; */
  color: #2c3e50;
}

.content-area {
  margin-top: 90px;
}

/* 明るめの緑 #42b983 */
</style>
