<template>
  <div class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
          <span class="sr-only">Menu</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#/">
          <span>MP</span>
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbar-ex-collapse">
        <ul class="nav navbar-nav navbar-right">

          <router-link active-class="active" tag="li" to="/modelo">
            <a>Modelo</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/meta-generica">
            <a>Meta Genérica</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/nivel-capacidade">
            <a>Nível Capacidade</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/nivel-maturidade">
            <a>Nível Maturidade</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/categoria">
            <a>Categoria</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/produto-trabalho">
            <a>Prod. Trab.</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/pratica-especifica">
            <a>Pratica Específ.</a>
          </router-link>

          <router-link active-class="active" tag="li" to="/meta-especifica">
            <a>Meta Específ.</a>
          </router-link>

        </ul>
      </div>
    </div>
  </div> <!-- / .navbar -->
</template>

<script>

  export default { }

</script>
