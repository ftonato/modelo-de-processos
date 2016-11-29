<template>
  <div class="categoria">

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Categoria</h1>
            <hr>
            <form class="form-horizontal" role="form" v-on:submit.prevent="adicionarCategoria">
              <div class="form-group">
                <div class="col-sm-2">
                  <label for="nome" class="control-label">Nome</label>
                </div>
                <div class="col-sm-10">

                  <ul class="edit" v-show="editando">
                    <li class="label label-success">Editando <strong>ID: </strong> <input class="input-fail" type="text" v-model="editCategoria.id"> </li>
                  </ul>

                  <input type="text" class="form-control" id="nome" placeholder="Nome" v-model="novaCategoria.nome">

                  <ul class="errors" v-show="!validarCategoria.nome">
                    <li class="label label-danger">Nome não pode ser vazio.</li>
                  </ul>

                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-8 col-sm-4 text-right">
                  <button v-show="editando" v-on:click.prevent="cancelarEdicao()" type="button" class="btn btn-default">Cancelar</button>
                  <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-12">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th class="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="categoria in categorias">
                  <td scope="row">{{ categoria.id }}</td>
                  <td scope="row">{{ categoria.nome }}</td>
                  <td class="text-center">
                    <a v-on:click.prevent="editarCategoria(categoria)" href="#" title="Editar Categoria"><i class="fa fa-pencil"></i></a>
                    <a v-show="!editando" v-on:click.prevent="removerCategoria(categoria)" href="#" title="Deletar Categoria"><i class="fa fa-trash"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: 'Lista de Categorias',
        categorias: [],
        novaCategoria: {
          nome: '',
        },
        editCategoria: {
          id: '',
        },
        editando: false,
      }
    },
    mounted() {
      this.listarCategorias();
    },
    computed: {
      validarCategoria() {
        return {
          nome: !!this.novaCategoria.nome.trim(),
        }
      },
      validarFormulario() {
        let validarNovaCategoria = this.validarCategoria
        return Object.keys(validarNovaCategoria).every(function (key) {
          return validarNovaCategoria[key]
        })
      }
    },
    methods: {

      listarCategorias() {
        this.$http.get('http://localhost:3000/categoria').then((req) => {

          this.categorias = req.data;
        });

      },

      adicionarCategoria() {

        if (this.editando === true) {

          if (this.validarFormulario) {

            this.atualizarCategoria();

          } else {
            console.log('inválido');
          }

        } else {

          if (this.validarFormulario) {

            let resource = this.$resource('http://localhost:3000/categoria');
            let data = { 'nome': this.novaCategoria.nome };

            resource.save(data).then((response) => {
              console.log('success: ',response); // success callback

              this.listarCategorias();

              this.limparFormulario();

            }, (response) => {
              // error callback
              console.log('error: ',response);
            });

          } else {
            console.log('inválido');
          }
        }

      },

      editarCategoria(categoria) {
        let _id = categoria.id;
        let _nome = categoria.nome;

        this.editando = true;

        this.novaCategoria.nome = _nome;
        this.editCategoria.id = _id;

      },

      cancelarEdicao() {
        this.novaCategoria.nome = '';
        this.editCategoria.id = '';

        this.editando = false;
      },

      atualizarCategoria() {

        let data = { 'nome': this.novaCategoria.nome };
        let _id = this.editCategoria.id.trim();

        console.log('/categoria/'+_id, data);

        this.$http.put('http://localhost:3000/categoria/'+_id, data).then((response) => {
            console.log('success: ',response); // success callback

            this.listarCategorias();

            this.limparFormulario();

          }, (response) => {
            // error callback
            console.log('error: ',response);
          });

        this.editando = false;
      },

      removerCategoria(categoria) {

        let resource = this.$resource('http://localhost:3000/categoria{/id}');
        let _id = categoria.id.trim();

        resource.delete({id: _id}).then((response) => {
          // success callback
          console.log('deletado')

          this.listarCategorias();

        }, (response) => {
          // error callback
          console.log('falha ao deletar')
        });
      },

      limparFormulario() {
        this.novaCategoria.nome = '';
      }
    },

  }
</script>
<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }
  .errors {
    margin-top: 10px;
  }
  .edit {
    margin-bottom: 10px;
  }
  .input-fail {
    padding: 1px;
    border: none;
    background-color: transparent;
  }
</style>
