import Vue    from 'vue'
import Router from 'vue-router'
import Home   from './views/Home.vue'
import Quiz   from './views/Quiz.vue'
import Result from './views/Result.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    // {
      // path: '/quiz/:id',
    //   path: 'quiz/HOGE01FUGA23PIYO45',
    //   name: 'quiz',
    //   component: Quiz,
    // },
    // {
    //   path: '/result',
    //   name: 'result',
    //   component: Result,
    // },
    // {
    //   path: '/hoge',
    //   name: 'hoge',
    //   component: () => import(/* webpackChunkName: "hoge" */ './views/hoge.vue'),
    // },
  ]
})
