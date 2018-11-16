import Vue      from 'vue'
import App      from './App.vue'
import firebase from 'firebase/app';
import firebaseConfig from '@/firebaseConfig.js'
import router   from './router'
import store    from './store'
import VueQrcodeReader from 'vue-qrcode-reader'
import Vuetify  from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import './registerServiceWorker'

Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(VueQrcodeReader)
Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
