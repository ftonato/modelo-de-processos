import Vue from 'vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import App from './App.vue'
import Navbar from './components/Navbar.vue';
import Categoria from './components/Categoria.vue';
import Modelo from './components/Modelo.vue';
import AreaProcesso from './components/AreaProcesso.vue';
import MetaGenerica from './components/MetaGenerica.vue';
import NivelMaturidade from './components/NivelMaturidade.vue';
import NivelCapacidade from './components/NivelCapacidade.vue';
import Index from './components/Index.vue';
import ProdutoTrabalho from './components/ProdutoTrabalho.vue';
import PraticaEspecifica from './components/PraticaEspecifica.vue';
import MetaEspecifica from './components/MetaEspecifica.vue';

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'active',
    routes: [
      {
        path: '/',
        components: {
          default: Index,
          sidebar: Navbar
        }
      },
      {
        path: '/area-processo',
        components: {
          default: AreaProcesso,
          sidebar: Navbar
        }
      },
      {
        path: '/meta-generica',
        components: {
          default: MetaGenerica,
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
        path: '/nivel-capacidade',
        components: {
          default: NivelCapacidade,
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
      },
      {
        path: '/produto-trabalho',
        components: {
          default: ProdutoTrabalho,
          sidebar: Navbar
        }
      },
      {
        path: '/pratica-especifica',
        components: {
          default: PraticaEspecifica,
          sidebar: Navbar
        }
      },
      {
        path: '/meta-especifica',
        components: {
          default: MetaEspecifica,
          sidebar: Navbar
        }
      }
    ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
