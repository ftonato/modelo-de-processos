import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

/* Components */
import App from './App.vue'
import Navbar from './components/Navbar.vue';
import Categoria from './components/Categoria.vue';
import A from './components/A.vue';
import B from './components/B.vue';
import C from './components/C.vue';

Vue.use(VueResource)
Vue.use(VueRouter)

// Vue.config.debug = true;
// Vue.config.devtools = true

const router = new VueRouter({
    //mode: 'history',
    linkActiveClass: 'active',
    routes: [
      {
        path: '/',
        components: {
          default: A,//require('./components/A.vue'),
          sidebar: Navbar//require('./components/Navbar.vue')
        }
      },
      {
        path: '/b',
        components: {
          default: B,//require('./components/B.vue'),
          sidebar: Navbar//require('./components/Navbar.vue')
        }
      },
      {
        path: '/c',
        components: {
          default: C,//require('./components/C.vue'),
          sidebar: Navbar//require('./components/Navbar.vue')
        }
      },
      {
        path: '/categoria',
        components: {
          default: Categoria,//require('./components/Categoria.vue'),
          sidebar: Navbar//require('./components/Navbar.vue')
        }
      }
    ]
})

// router.start(App, '#app')
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  //render: h => h(require('./App.vue')),
})
