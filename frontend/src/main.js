import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';


Vue.use(VueResource)
//Vue.use(VueRouter)

// const router = new VueRouter({
//     hashbang: false,
//     history: true
// })

// router.map({
//   '/': {
//     component: App
//   }
// })

// router.start(App, '#app')
new Vue({
  el: '#app',
  render: h => h(App),
})
