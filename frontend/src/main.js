import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

/* Components */
import App from './App.vue'
import Navbar from './components/Navbar.vue';
import Categoria from './components/Categoria.vue';
import Modelo from './components/Modelo.vue';
import NivelMaturidade from './components/NivelMaturidade.vue';
import A from './components/A.vue';

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
          default: A,
          sidebar: Navbar
        }
      },
      {
        path: '/nivel-maturidade',
        components: {
          default: NivelMaturidade,
          sidebar: Navbar
        }
      },
      {
        path: '/categoria',
        components: {
          default: Categoria,
          sidebar: Navbar
        }
      },
      {
        path: '/modelo',
        components: {
          default: Modelo,
          sidebar: Navbar
        }
      }
    ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  //render: h => h(require('./App.vue')),
})
