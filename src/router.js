import Vue       from 'vue'
import Router    from 'vue-router'
import Home      from './views/Home.vue'
import Area      from './views/Area.vue'
import ClearList from './views/ClearList.vue'
import Help      from './views/Help.vue'
import QrReader  from './views/QrReader.vue'
import Quiz      from './views/Quiz.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/',           name: 'home',       component: Home },
    { path: '/area',       name: 'area',       component: Area },
    { path: '/clear_list', name: 'clear_list', component: ClearList },
    { path: '/help',       name: 'help',       component: Help },
    { path: '/qr_reader',  name: 'qr_reader',  component: QrReader },
    { path: '/quiz/:id',   name: 'quiz',       component: Quiz },
  ],
})
