<template>
  <div id="app">


    <!-- Navbar -->
    <Navbar></Navbar>

    <!-- Lista de Categorias -->
    <Categoria></Categoria>

  </div>
</template>

<script>

  import Categoria from './components/Categoria.vue';
  import Navbar from './components/Navbar.vue';

  export default {
  //name: 'app',
  components: {
    Categoria, Navbar
  },
  data () {

    return {
      msg: 'Hello App.js',
    }
  },
}
</script>
