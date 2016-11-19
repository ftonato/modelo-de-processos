<template>
  <div class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span class="sr-only">Menu</span>
            <span class="icon-bar">
            </span>
            <span class="icon-bar">
            </span>
            <span class="icon-bar">
            </span>
          </button>
          <a class="navbar-brand" href="#/">
            <span>MP</span>
          </a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-ex-collapse">
          <ul class="nav navbar-nav navbar-right">

            <router-link active-class="active" tag="li" to="/b">
              <a>Modelo</a>
            </router-link>
            <router-link active-class="active" tag="li" to="/c">
              <a>Nível Capacidade</a>
            </router-link>

            <li>
              <a href="nivel_maturidade.html">Nível Maturidade</a>
            </li>

            <router-link active-class="active" tag="li" to="/categoria">
              <a>Categoria</a>
            </router-link>
            <li>
              <a href="produto_trabalho.html">Produtos Trabalho</a>
            </li>
          </ul>
        </div>
      </div>
    </div> <!-- / .navbar -->
</template>

<script>

  export default { }

</script>
